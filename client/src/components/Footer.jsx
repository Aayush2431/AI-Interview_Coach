function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold text-blue-500">
              AI Interview Coach
            </h2>

            <p className="mt-4">
              Prepare smarter with AI-powered resume analysis,
              mock interviews, and personalized feedback.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Home</a></li>
              <li><a href="#" className="hover:text-blue-400">Features</a></li>
              <li><a href="#" className="hover:text-blue-400">About</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <p>Email: support@aiinterviewcoach.com</p>
            <p className="mt-2">Made with ❤️ using React</p>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center">
          © 2026 AI Interview Coach. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;