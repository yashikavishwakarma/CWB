import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ title, description, icon, link }) {
  return (
    <Link to={link} className="block bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-indigo-600 text-4xl">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
