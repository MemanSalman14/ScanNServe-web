import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className='about'>
      {/* Hero Section */}
      <section className='about-hero'>
        <div className='about-hero-overlay'></div>
        <div className='about-hero-content'>
          <span className='about-badge'>✦ ABOUT SCAN N SERVE ✦</span>
          <h1>
            <span className='hero-main'>WHERE DINING</span>
            <span className='hero-sub'>meets</span>
            <span className='hero-main'>INNOVATION</span>
          </h1>
          <p>Transforming your table into a smart dining experience</p>
        </div>
      </section>

      {/* Story Section */}
      <section className='about-story'>
        <div className='story-container'>
          <div className='story-content'>
            <span className='section-badge'>OUR STORY</span>
            <h2>Redefining Restaurant Dining</h2>
            <p className='story-intro'>
              At ScanNServe, we believe dining should be effortless, enjoyable, and modern. 
              Born from the vision to blend culinary excellence with cutting-edge technology, 
              we've created a seamless QR-based ordering system that puts you in control.
            </p>
            <p>
              No more waiting for menus, no hassle flagging down servers, and no complicated 
              apps to download. Simply scan, browse, order, and enjoy. Our mission is to 
              enhance your dining experience while maintaining the warmth and service of 
              traditional hospitality.
            </p>
            <div className='story-stats'>
              <div className='stat'>
                <span className='stat-number'>1000+</span>
                <span className='stat-label'>Happy Diners</span>
              </div>
              <div className='stat'>
                <span className='stat-number'>50+</span>
                <span className='stat-label'>Menu Items</span>
              </div>
              <div className='stat'>
                <span className='stat-number'>98%</span>
                <span className='stat-label'>Satisfaction Rate</span>
              </div>
            </div>
          </div>
          <div className='story-image'>
            <div className='image-wrapper'>
              <img src="/about-restaurant.jpg" alt="Restaurant Interior" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='about-features'>
        <div className='features-header'>
          <span className='section-badge'>WHY CHOOSE US</span>
          <h2>The ScanNServe Advantage</h2>
        </div>
        <div className='features-grid'>
          <div className='feature-card'>
            <div className='feature-icon'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Contactless & Safe</h3>
            <p>Browse and order without physical contact. Your safety is our priority with our touchless QR system.</p>
          </div>

          <div className='feature-card'>
            <div className='feature-icon'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Instant Ordering</h3>
            <p>Place your order in seconds. No waiting for staff, no communication barriers—just smooth ordering.</p>
          </div>

          <div className='feature-card'>
            <div className='feature-icon'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Digital Menu</h3>
            <p>Explore our complete menu with detailed descriptions, images, and real-time availability updates.</p>
          </div>

          <div className='feature-card'>
            <div className='feature-icon'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Personalized Service</h3>
            <p>Customize your orders, add special requests, and enjoy dining tailored to your preferences.</p>
          </div>

          <div className='feature-card'>
            <div className='feature-icon'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10h18M3 14h18M8 6l4-4 4 4M8 18l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Order Tracking</h3>
            <p>Track your order status in real-time. Know exactly when your food is being prepared and served.</p>
          </div>

          <div className='feature-card'>
            <div className='feature-icon'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Flexible Payment</h3>
            <p>Pay online or at the counter—your choice. Multiple payment options for your convenience.</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='about-values'>
        <div className='values-container'>
          <span className='section-badge'>OUR VALUES</span>
          <h2>What Drives Us</h2>
          <div className='values-grid'>
            <div className='value-item'>
              <div className='value-number'>01</div>
              <h3>Innovation</h3>
              <p>Constantly evolving our technology to provide the best dining experience possible.</p>
            </div>
            <div className='value-item'>
              <div className='value-number'>02</div>
              <h3>Quality</h3>
              <p>From our food to our service, excellence is non-negotiable in everything we do.</p>
            </div>
            <div className='value-item'>
              <div className='value-number'>03</div>
              <h3>Convenience</h3>
              <p>Making dining effortless so you can focus on what matters—enjoying great food.</p>
            </div>
            <div className='value-item'>
              <div className='value-number'>04</div>
              <h3>Customer First</h3>
              <p>Your satisfaction and comfort are at the heart of every decision we make.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='about-cta'>
        <div className='cta-content'>
          <h2>Ready to Experience Modern Dining?</h2>
          <p>Join us today and discover how technology can enhance your restaurant experience</p>
          <button className='cta-button' onClick={() => window.location.href = '/#explore-menu'}>
            Explore Our Menu
          </button>
        </div>
      </section>
    </div>
  )
}

export default About