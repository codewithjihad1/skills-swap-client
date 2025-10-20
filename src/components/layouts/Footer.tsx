import { MapPinHouse, Navigation} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
     <footer className="bg-accent text-gray-900 mt-auto">
  <div className="max-w-7xl mx-auto px-6 lg:px-16 sm:px-14 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {/* Brand / About Section */}
    <div className="text-center sm:text-left">
      <h2 className="text-2xl font-extrabold mb-4">About Our Company</h2>
      <p className="text-sm mb-4">
        Connect, learn, and grow together with passionate individuals from
        around the world. Share your unique skills, discover new talents, and
        collaborate on meaningful projects that inspire growth and creativity.
      </p>

      <div className="flex space-x-4 justify-center sm:justify-start">
        <Image
          src="/facebook.png"
          alt="Facebook"
          width={42}
          height={42}
          className="bg-white rounded-full p-2 hover:bg-primary transform hover:-translate-y-1 transition-all duration-300"
        />
        <Image
          src="/youtube.png"
          alt="YouTube"
          width={42}
          height={42}
          className="bg-white rounded-full p-2 hover:bg-primary transform hover:-translate-y-1 transition-all duration-300"
        />
        <Image
          src="/linkedin.png"
          alt="LinkedIn"
          width={42}
          height={42}
          className="bg-white rounded-full p-2 hover:bg-primary transform hover:-translate-y-1 transition-all duration-300"
        />
      </div>
    </div>

    {/* Quick Links */}
    <div className="text-center sm:text-left">
      <h3 className="text-xl font-extrabold mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li><Link href="/courses" className="hover:text-primary transition-colors">Browse Skills</Link></li>
        <li><Link href="/teach" className="hover:text-primary transition-colors">Teach a Skill</Link></li>
        <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
        <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
      </ul>
    </div>

    {/* Support */}
    <div className="text-center sm:text-left">
      <h3 className="text-xl font-extrabold mb-4">Support</h3>
      <ul className="space-y-2 text-sm">
        <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
        <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
        <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
      </ul>
    </div>

    {/* Subscribe */}
    <div className="text-center sm:text-left">
      <h3 className="text-xl font-extrabold mb-4">Subscribe</h3>
      <p className="text-sm mb-3">Stay updated with our latest news and offers.</p>
      <div className="flex transform hover:-translate-y-1 transition-all duration-300">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 flex-grow focus:outline-none bg-white"
        />
        <button className="bg-primary px-6 text-white hover:bg-accent hover:border border-black transition-colors ">
         <Navigation size={16} />
        </button>
      </div>
                    <div className="mt-4 flex gap-2 items-center justify-center sm:justify-start">
                        <MapPinHouse className="text-secondary" />
                        <h3>Dhaka, Bangladesh</h3>
                </div>
                </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-[#8CB8A4] mt-6 py-4 text-center pb-10">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto px-6">
      <p className="text-sm">
        © {new Date().getFullYear()} Skill Swap. All rights reserved.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Image src="/bKash-Logo.png" alt="bkash" width={52} height={52} className="bg-white" />
        <Image src="/NagadLogo.png" alt="nagad" width={52} height={52} className="bg-white" />
        <Image src="/upay.png" alt="upay" width={52} height={52} className="bg-white p-2" />
        <Image src="/mastercard.png" alt="mastercard" width={52} height={52} className="bg-white p-2" />
        <Image src="/skrill.png" alt="skrill" width={52} height={52} className="bg-white p-2" />
        <Image src="/dbbl.png" alt="dbbl" width={52} height={52} className="bg-white p-2" />
      </div>
    </div>
  </div>
</footer>


    );
};

export default Footer;
