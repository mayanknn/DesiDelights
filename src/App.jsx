"use client"

import { useState } from "react"
import { ChefHat, Utensils } from "lucide-react"
import './index.css'; // or './styles.css'


// Button component
const Button = ({ className, children, ...props }) => (
  <button
    className={`px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
)

// Label component
const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
)

// Input component
const Input = ({ id, type = "text", placeholder, required, ...props }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    required={required}
    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
    {...props}
  />
)

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => setIsLogin(!isLogin)

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <ChefHat className="h-10 w-10 text-orange-600 mr-2" />
          <h1 className="text-3xl font-bold text-orange-600">Desi Delight</h1>
          <Utensils className="h-10 w-10 text-orange-600 ml-2" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">{isLogin ? "Login" : "Register"}</h2>
        <form className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" required />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" required />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm your password" required />
            </div>
          )}
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={toggleForm} className="text-orange-600 hover:underline">
            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  )
}