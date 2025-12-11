import { Inngest } from "inngest";
import userModel from "../models/userModel.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ScanNServe-app" });

// Inngest Function to save user data to database when user is created in Clerk
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    // Get primary email
    const primaryEmail = email_addresses.find(email => email.id === event.data.primary_email_address_id) 
      || email_addresses[0];

    return await step.run("create-user", async () => {
      try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ clerkId: id });
        
        if (existingUser) {
          console.log("User already exists:", id);
          return { success: true, message: "User already exists", userId: existingUser._id };
        }

        // Create new user
        const userData = {
          clerkId: id,
          email: primaryEmail.email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
          profilePicture: image_url || '',
          cartData: {}
        };

        const newUser = await userModel.create(userData);
        console.log("User created successfully:", newUser._id);
        
        return { success: true, message: "User created", userId: newUser._id };
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    });
  }
);

// Inngest Function to update user data in database when user is updated in Clerk
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    // Get primary email
    const primaryEmail = email_addresses.find(email => email.id === event.data.primary_email_address_id) 
      || email_addresses[0];

    return await step.run("update-user", async () => {
      try {
        const updatedUserData = {
          email: primaryEmail.email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
          profilePicture: image_url || '',
        };

        const updatedUser = await userModel.findOneAndUpdate(
          { clerkId: id },
          updatedUserData,
          { new: true }
        );

        if (!updatedUser) {
          console.log("User not found, creating new user:", id);
          // If user doesn't exist, create it
          const newUserData = {
            clerkId: id,
            ...updatedUserData,
            cartData: {}
          };
          const newUser = await userModel.create(newUserData);
          return { success: true, message: "User created", userId: newUser._id };
        }

        console.log("User updated successfully:", updatedUser._id);
        return { success: true, message: "User updated", userId: updatedUser._id };
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    });
  }
);

// Inngest Function to delete user from database when user is deleted in Clerk
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    const { id } = event.data;

    return await step.run("delete-user", async () => {
      try {
        const deletedUser = await userModel.findOneAndDelete({ clerkId: id });

        if (!deletedUser) {
          console.log("User not found for deletion:", id);
          return { success: false, message: "User not found" };
        }

        console.log("User deleted successfully:", deletedUser._id);
        return { success: true, message: "User deleted", userId: deletedUser._id };
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    });
  }
);

// Inngest Function to sync user session
const syncUserSession = inngest.createFunction(
  { id: "sync-user-session" },
  { event: "clerk/session.created" },
  async ({ event, step }) => {
    const { user_id } = event.data;

    return await step.run("sync-session", async () => {
      try {
        // Verify user exists in database
        const user = await userModel.findOne({ clerkId: user_id });

        if (!user) {
          console.log("User not found during session creation:", user_id);
          return { success: false, message: "User not found" };
        }

        console.log("Session created for user:", user._id);
        return { success: true, message: "Session synced", userId: user._id };
      } catch (error) {
        console.error("Error syncing session:", error);
        throw error;
      }
    });
  }
);

// Export all Inngest functions
export const functions = [
  syncUserCreation, 
  syncUserUpdation, 
  syncUserDeletion,
  syncUserSession
];