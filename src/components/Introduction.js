// import { Button } from 'react-bootstrap';
// import _ from 'lodash';
// import { useParams } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';

// Hero Section
function HeroSection() {
  return (
    <header className="hero-image">
      <h2 className="display-4 text-shadow">The easiest way to plan your travels</h2>
      <p className="lead text-shadow">All your travel plans, all in one place.</p>
      <Link to="/input" className="btn btn-outline-light btn-lg">Get started for free</Link>
    </header>
  );
}

// Individual Feature
function Feature({ title, description }) {
  return (
    <div className="col-md-4">
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Features Section
function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <h3 className="text-center mb-5">Why Journemo?</h3>
      <div className="row">
        <Feature 
          title="Interactive Itinerary" 
          description="Create, manage and visualize your itinerary in a dynamic calendar view. Cover all the important details for each day of your travel." 
        />
        <Feature 
          title="Add Events and Notes" 
          description="Add important events and notes to your itinerary. Attach contact information, addresses and other relevant data to each event." 
        />
        <Feature 
          title="Budget Tracking" 
          description="Set your travel budget and enter the estimated costs for each event in your schedule. Keep track of your expenses and make sure you stay within your budget." 
        />
      </div>
    </section>
  );
}

// Call to Action
function CallToAction() {
  return (
    <section className="row mt-5">
      <div className="col-lg-12 text-center">
        <h2>Ready to start your adventure?</h2>
        <a href="#signup" className="btn btn-primary btn-lg">Sign Up for free</a>
      </div>
    </section>
  );
}


// Main Introduction Component
function Introduction(props) {
  return (
    <div>
      <HeroSection />
      <main className="container mt-4">
        <FeaturesSection />
        <CallToAction />
      </main>
    </div>
  );
}

export default Introduction;
