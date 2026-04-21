export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="mt-8 bg-[#0F172A] px-6 pb-5 pt-8 md:px-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-[30px] leading-none text-[#F1F5F9]">
            Blog<span className="text-[#818CF8]">Hub</span>
          </p>
          <p className="mt-3 max-w-47.5 text-[12.5px] leading-[1.6] text-[#475569]">
            A calm writing workspace for your thoughts and stories.
          </p>
        </div>

        <div>
          <p className="text-[10.5px] uppercase tracking-[0.08em] text-[#475569]">Product</p>
          <div className="mt-4 space-y-1.5 text-[13px] text-[#64748B]">
            <a href="#" className="block hover:text-[#818CF8]">Features</a>
            <a href="#" className="block hover:text-[#818CF8]">Pricing</a>
            <a href="#" className="block hover:text-[#818CF8]">Roadmap</a>
          </div>
        </div>

        <div>
          <p className="text-[10.5px] uppercase tracking-[0.08em] text-[#475569]">Company</p>
          <div className="mt-4 space-y-1.5 text-[13px] text-[#64748B]">
            <a href="#" className="block hover:text-[#818CF8]">About</a>
            <a href="#" className="block hover:text-[#818CF8]">Careers</a>
            <a href="#" className="block hover:text-[#818CF8]">Contact</a>
          </div>
        </div>

        <div>
          <p className="text-[10.5px] uppercase tracking-[0.08em] text-[#475569]">Legal</p>
          <div className="mt-4 space-y-1.5 text-[13px] text-[#64748B]">
            <a href="#" className="block hover:text-[#818CF8]">Privacy</a>
            <a href="#" className="block hover:text-[#818CF8]">Terms</a>
            <a href="#" className="block hover:text-[#818CF8]">Cookies</a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-7xl items-center justify-between border-t border-[#1E293B] pt-4 text-[12px] text-[#334155]">
        <span>© {currentYear} BlogHub. All rights reserved.</span>
        <span>Built for writers</span>
      </div>
    </footer>
  )
}
