import React from 'react';
import { Package, Users, Star } from 'lucide-react';

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">About BlackFabrics</h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            We bring the freshest Kasi brands to the people. Our platform helps local designers 
            showcase and sell their fashion, making streetwear accessible to all.
          </p>
          <p>
            Founded in 2025, BlackFabrics is dedicated to supporting Kasi culture through fashion 
            and empowering entrepreneurs in the industry.
          </p>
          <p>
            Our mission is to create a bridge between talented local designers and fashion enthusiasts 
            who appreciate authentic streetwear culture. We believe in the power of community and 
            the importance of supporting local businesses.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Products</h3>
            <p>Curated selection of the finest Kasi streetwear brands</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Community Focused</h3>
            <p>Supporting local designers and celebrating Kasi culture</p>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Customer First</h3>
            <p>Dedicated to providing exceptional shopping experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
