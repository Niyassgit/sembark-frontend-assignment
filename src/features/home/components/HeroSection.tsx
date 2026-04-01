const HeroSection = () => {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            
                .font-berkshire {
                    font-family: 'Berkshire Swash', cursive;
                }
            `}</style>
      <section className="relative flex flex-col items-center pb-48 text-center text-sm max-md:px-4 bg-[url('https://www.shutterstock.com/shutterstock/videos/3537898495/thumb/12.jpg?ip=x480')] bg-cover bg-center overflow-hidden">
        {/* Subtle Dark Overlay to help text readability */}
        <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-center p-1.5 mt-24 md:mt-28 rounded-full border border-slate-300 text-xs text-slate-800 bg-white/40 backdrop-blur-sm">
          <div className="flex items-center">
            <img
              className="size-7 rounded-full border-2 border-white"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
              alt="userImage1"
            />
            <img
              className="size-7 rounded-full border-2 border-white -translate-x-2"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
              alt="userImage2"
            />
            <img
              className="size-7 rounded-full border-2 border-white -translate-x-4"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
              alt="userImage3"
            />
          </div>
          <p className="-translate-x-2 font-medium">
            Trusted by over 10k happy customers
          </p>
        </div>

        <h1 className="relative z-10 font-bold text-slate-900 text-[45px]/[52px] md:text-7xl/[1.1] mt-6 max-w-4xl tracking-tight">
          Upgrade Your Home with{" "}
          <span className="text-indigo-600">shopYaar</span> Essentials.
        </h1>
        <p className="relative z-10 text-lg md:text-xl mt-4 max-w-2xl text-[#57a2ee] font-medium leading-relaxed">
          Discover a curated selection of premium home appliances designed to
          bring efficiency and elegance to your everyday life.
        </p>
        <p className="relative z-10 text-base mt-2 max-w-xl text-[#11063d]  italic">
          Limited-time offer: Get up to 20% off on your first order.
        </p>

        <form className="relative z-10 flex items-center mt-10 max-w-lg h-16 w-full rounded-full border border-slate-200 bg-white/80 backdrop-blur-md shadow-xl shadow-slate-200/50">
          <input
            type="email"
            placeholder="Subscribe for exclusive deals"
            className="w-full h-full outline-none bg-transparent pl-6 pr-2 text-slate-800 placeholder:text-slate-400 rounded-full"
          />
          <button className="bg-indigo-600 text-white hover:bg-indigo-700 text-nowrap px-8 md:px-10 h-12 mr-2 rounded-full font-bold shadow-lg shadow-indigo-200 transition active:scale-95">
            Get Started
          </button>
        </form>
      </section>
    </>
  );
};

export default HeroSection;
