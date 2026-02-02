import {
  FaUsers,
  FaShippingFast,
  FaHeadset,
  FaCheckCircle,
  FaAward,
  FaSmile,
} from "react-icons/fa";
import React from "react";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const defaultTeam: TeamMember[] = [
  {
    name: "Rahim Ahmed",
    role: "CEO & Founder",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Karim Khan",
    role: "Head of Operations",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Fatima Begum",
    role: "Lead Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Jamal Uddin",
    role: "Marketing Head",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

export const statsData = [
  { label: "Products", value: "500+", icon: FaCheckCircle, color: "violet" },
  { label: "Customers", value: "10k+", icon: FaUsers, color: "orange" },
  { label: "Reviews", value: "4.8/5", icon: FaSmile, color: "green" },
  { label: "Awards", value: "15+", icon: FaAward, color: "violet" },
];

export const featuresData = [
  {
    title: "Fast Delivery",
    desc: "Nationwide Network",
    icon: FaShippingFast,
    color: "violet",
  },
  {
    title: "24/7 Support",
    desc: "Expert Assistance",
    icon: FaHeadset,
    color: "orange",
  },
];
