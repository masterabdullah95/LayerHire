import { Briefcase, Phone, Mail, MapPin } from 'lucide-react'
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";
import { SlSocialLinkedin } from "react-icons/sl";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-8xl mx-auto px-6 lg:px-14 pt-12 pb-5">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-medium text-sm mb-3">
              <Briefcase className="h-4 w-4" />
              LayerHire
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mb-5">
              Connecting skilled developers with top companies. LayerHire makes job hunting and hiring simple, fast, and built for the modern tech workforce.
                
                
            </p>
            <div className='footer-icons flex gap-3'>
                <AiOutlineYoutube className='w-6 h-6 cursor-pointer text-gray-500 hover:text-red-600'/>
                <CiTwitter className='w-6 h-6 cursor-pointer text-gray-500 hover:text-blue-500'/>
                <IoLogoInstagram className='w-6 h-6 cursor-pointer text-gray-500 hover:text-pink-700'/>
                <CiFacebook className='w-6 h-6 cursor-pointer text-gray-500 hover:text-blue-700'/>
                <SlSocialLinkedin className='w-5 h-5 cursor-pointer text-gray-500 hover:text-blue-700'/>
            </div>

          </div>

          {/* Explore */}
          <div>
            <p className="text-sm font-medium mb-4">Explore</p>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Browse Jobs</Link>
              <Link to="/post-job" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Post a Job</Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              <Link to="/my-applications" className="text-sm text-muted-foreground hover:text-foreground transition-colors">My Applications</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-medium mb-4">Company</p>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-medium mb-4">Get in Touch</p>
            <div className="flex flex-col gap-3">
              <div className='flex gap-2 items-center'>
                <MapPin className="h-4 w-4 text-gray-500"/>
                <span className="text-sm text-muted-foreground">Karachi, Pakistan</span>
              </div>
              <div className='flex gap-2 items-center'>
                <Mail className="h-4 w-4 text-gray-500"/>
                <span className="text-sm text-muted-foreground">hello@layerhire.com</span>
              </div>
              <div className='flex gap-2 items-center'>
                <Phone className="h-4 w-4 text-gray-500"/>
                <span className="text-sm text-muted-foreground">123-456-789</span>
              </div>
              
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">© 2026 LayerHire. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer