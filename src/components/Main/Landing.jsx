import React, { useRef } from "react";
import { Menu } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Landing() {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <nav className="bg-gray-900 text-white w-full text-sm shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <a
            className="font-extrabold text-4xl tracking-wider ml-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
            href="/">
            VibeZ
          </a>

          <div className="hidden lg:flex gap-8">
            <a className="hover:text-purple-400" href="/explore">
              Explore
            </a>
            <a className="hover:text-purple-400" href="/login">
              Login
            </a>
            <a className="hover:text-purple-400" href="/signup">
              Signup
            </a>
          </div>
          <div className="lg:hidden flex items-center">
            <button>
              <Menu color="white" size={24} />
            </button>
          </div>
        </div>
      </nav>
      <div className="flex-1">
        <section className="flex flex-col text-center w-full items-center py-16 justify-center gap-8 container min-h-[75vh] mb-8">
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-2xl md:text-4xl lg:text-6xl text-white font-extrabold leading-relaxed lg:leading-normal drop-shadow-2xl">
              Ignite Your Imagination<br />Host Remarkable Events
            </h1>
            <p className="md:max-w-[90%] py-4 text-gray-300 mt-1">
              RSVP and Management Made Effortless for Creators
            </p>
            <div className="inline-flex items-center gap-4">
              <a
                className="bg-purple-500 rounded-full py-3 px-6 text-white shadow-lg mt-6"
                href="/signup"
              >
                Get Started
              </a>
              <a
                className="bg-pink-500 rounded-full py-3 px-6 text-white shadow-lg mt-6"
                href="/explore"
              >
                Explore Events
              </a>
              <a className="bg-green-500 rounded-full py-3 px-6 text-white shadow-lg mt-6" href="/eventform">
                Host An Event
              </a>
            </div>
          </div>
        </section>
        <section className="bg-gray-800 py-14">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="md:pt-16" style={{ flexBasis: "50%" }}>
                <img
                  className="w-full rounded-lg shadow-lg"
                  src="https://media.istockphoto.com/id/1977348709/photo/laughing-young-businesswoman-talking-with-colleagues-in-an-office-hallway.webp?a=1&b=1&s=612x612&w=0&k=20&c=1QrGBVFBZyfg0zm_EETpeG49dbAjIPDEOxKRtf7L16Q="
                  alt="Event discussion"
                />
              </div>
              <div
                className="flex flex-col gap-4 items-start justify-center text-left lg:pl-16"
                style={{ flexBasis: "50%" }}
              >
                <div className="flex items-center gap-2">
                  <hr className="w-20 h-1 bg-purple-500" />
                  <p className="text-purple-500 font-semibold text-lg">Unleash Your Creativity</p>
                </div>
                <h1 className="text-3xl md:text-5xl text-pink-500 font-semibold md:leading-normal">
                  Unlock Your Creative Potential
                </h1>
                <p className="text-justify leading-relaxed md:max-w-[90%] py-4 text-gray-300">
                  Our app empowers individual contributors and artists like you to
                  unleash your creativity and organize remarkable events. Whether
                  you're planning a solo exhibition, a live performance, or a
                  collaborative workshop, our platform provides the tools and
                  features you need to make your events a resounding success.
                </p>
                <a
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-purple-600 rounded-full py-3 px-6 text-white shadow-lg"
                  href="/signup"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-black py-16 text-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex flex-col gap-4 lg:w-1/2">
                <div className="flex items-center gap-2">
                  <hr className="w-20 h-1 bg-purple-500" />
                  <p className="text-purple-500 font-semibold">Secure</p>
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold text-white md:leading-normal">
                  Seamless Event Planning and Organization
                </h2>
              </div>
              <div className="lg:w-1/2">
                <p className="text-justify leading-relaxed py-4 text-gray-300 w-full">
                  Say goodbye to the hassles of event planning. Our user-friendly
                  interface simplifies the process, allowing you to focus on your
                  artistic endeavors. Create and manage events effortlessly, from
                  setting dates and locations to providing event descriptions and
                  ticketing options.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-row gap-4 items-center justify-between container mt-8">
          <hr className="w-full border-gray-700 opacity-50" />
          <div className="inline-flex flex-[50%] gap-4 justify-end items-center -mt-8">
            <button
              onClick={handlePrev}
              className="text-white p-4 rounded-full outline outline-1 outline-white hover:bg-purple-500 transition-all"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"></path>
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="text-white p-4 rounded-full outline outline-1 outline-white hover:bg-purple-500 transition-all"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M268 112l144 144-144 144m124-144H100"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Swiper
            ref={swiperRef}
            slidesPerView={3}
            spaceBetween={50}
            loop={true}
            className="swiper-container"
          >
            <SwiperSlide>
              <div className="flex flex-col w-full rounded-lg bg-gray-800 shadow-lg gap-4 items-start justify-center p-6 group text-white hover:scale-105 transition-all">
                <div className="text-4xl text-purple-500">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"></path>
                    <path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9.9 9.9 0 00-2.52 4.47l-14.31 57.22a2 2 0 002.42 2.42l57.22-14.31a9.9 9.9 0 004.47-2.52L446.66 112a8 8 0 000-11.34L435.31 89a8 8 0 00-11.34 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg text-pink-500 font-semibold">
                  Event Creation
                </h3>
                <p className="leading-relaxed text-gray-300 text-justify">
                  Effortlessly create events with our intuitive platform. Customize
                  event details, set dates, and invite attendees with ease.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col w-full rounded-lg bg-gray-800 shadow-lg gap-4 items-start justify-center p-6 group text-white hover:scale-105 transition-all">
                <div className="text-4xl text-purple-500">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M512 388a120 120 0 1 0 120 120 120.36 120.36 0 0 0-120-120zm0 168a48 48 0 1 1 48-48 48.09 48.09 0 0 1-48 48z"></path>
                    <path d="M911.74 283.25a400 400 0 0 0-799.48 0A298.79 298.79 0 0 0 64 512c0 164.45 133.55 298 298 298a299.2 299.2 0 0 0 150-40.07l79.07 31.63v77.35a24 24 0 0 0 36.74 20.41l142.21-94.81a24 24 0 0 0 10.79-20.41V770.3l79.07-31.63A299.2 299.2 0 0 0 960 512a298.79 298.79 0 0 0-48.26-228.75zM768 448h-44.66c-3.65-53.09-22.4-102.09-54.69-145.27l31.58-31.59a8 8 0 0 0-5.66-13.65h-45.26a8 8 0 0 0-5.66 2.34l-32.41 32.41a301.39 301.39 0 0 0-179.9-64.24V160h48a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16h-128a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48v88.61A301.39 301.39 0 0 0 326.8 292.24l-32.41-32.41a8 8 0 0 0-5.66-2.34h-45.25a8 8 0 0 0-5.66 13.65l31.59 31.59c-32.28 43.18-51 92.18-54.66 145.27H256a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h44.75c3.65 53.09 22.38 102.09 54.66 145.27l-31.58 31.59a8 8 0 0 0 5.66 13.65h45.26a8 8 0 0 0 5.66-2.34l32.42-32.42a301.39 301.39 0 0 0 179.9 64.24V864h-48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16h-48v-88.61a301.39 301.39 0 0 0 179.9-64.24l32.42 32.42a8 8 0 0 0 5.66 2.34h45.26a8 8 0 0 0 5.66-13.65l-31.59-31.59c32.28-43.18 51-92.18 54.69-145.27H768a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
                  </svg>
                </div>
                <h3 className="text-lg text-pink-500 font-semibold">
                  Event Management
                </h3>
                <p className="leading-relaxed text-gray-300 text-justify">
                  Seamlessly manage your events with our comprehensive tools. Track
                  RSVPs, communicate with attendees, and ensure everything runs
                  smoothly.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col w-full rounded-lg bg-gray-800 shadow-lg gap-4 items-start justify-center p-6 group text-white hover:scale-105 transition-all">
                <div className="text-4xl text-purple-500">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M336 352a40 40 0 1 0 40 40 40 40 0 0 0-40-40z"></path>
                    <path d="M872 304h-40v-72a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v72H272v-72a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v72h-40a72.08 72.08 0 0 0-72 72v456a72.08 72.08 0 0 0 72 72h720a72.08 72.08 0 0 0 72-72V376a72.08 72.08 0 0 0-72-72zM480 576a40 40 0 1 1-40-40 40 40 0 0 1 40 40zm-144 0a40 40 0 1 1-40-40 40 40 0 0 1 40 40zm368 176H320a32 32 0 0 1-32-32v-80a32 32 0 0 1 32-32h384a32 32 0 0 1 32 32v80a32 32 0 0 1-32 32zm-48-136a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm144 0a40 40 0 1 1 40-40 40 40 0 0 1-40 40z"></path>
                  </svg>
                </div>
                <h3 className="text-lg text-pink-500 font-semibold">
                  Attendee Interaction
                </h3>
                <p className="leading-relaxed text-gray-300 text-justify">
                  Engage your audience and foster a sense of community. Our platform
                  allows for easy attendee interaction, helping you build lasting
                  connections.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col w-full rounded-lg bg-gray-800 shadow-lg gap-4 items-start justify-center p-6 group text-white hover:scale-105 transition-all">
                <div className="text-4xl text-purple-500">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm-28.5 318.5l-93.1-93.1c-6.2-6.2-6.2-16.4 0-22.6l93.1-93.1c6.2-6.2 16.4-6.2 22.6 0l93.1 93.1c6.2 6.2 6.2 16.4 0 22.6l-93.1 93.1c-6.2 6.2-16.4 6.2-22.6 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg text-pink-500 font-semibold">Analytics & Insights</h3>
                <p className="leading-relaxed text-gray-300 text-justify">
                  Gain valuable insights into your event performance. Track key metrics and
                  make data-driven decisions to optimize your events.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col w-full rounded-lg bg-gray-800 shadow-lg gap-4 items-start justify-center p-6 group text-white hover:scale-105 transition-all">
                <div className="text-4xl text-purple-500">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2a10 10 0 0 0-7 16.93V22a2 2 0 0 0 2.72 1.86L12 22l4.28 1.86A2 2 0 0 0 19 22v-3.07A10 10 0 0 0 12 2zm0 18.6l-2.16-.93a.75.75 0 0 0-.68 0L6 21.08v-1.45l4.88-2.11a.75.75 0 0 0 0-1.35L6 14.08v-1.44l3.16 1.37a.75.75 0 0 0 .68 0L12 13.42l2.16.93a.75.75 0 0 0 .68 0L18 13.08v1.44l-4.88 2.11a.75.75 0 0 0 0 1.35L18 19.08v1.44l-3.16-1.37a.75.75 0 0 0-.68 0L12 20.6z"></path>
                  </svg>
                </div>
                <h3 className="text-lg text-pink-500 font-semibold">Venue Selection</h3>
                <p className="leading-relaxed text-gray-300 text-justify">
                  Choose the perfect venue for your events from a curated list of top-rated
                  locations. Filter by size, location, and amenities.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col w-full rounded-lg bg-gray-800 shadow-lg gap-4 items-start justify-center p-6 group text-white hover:scale-105 transition-all">
                <div className="text-4xl text-purple-500">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M440 48H72c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h368c13.255 0 24-10.745 24-24V72c0-13.255-10.745-24-24-24zM376 152c0 8.837-7.163 16-16 16h-32v32c0 8.837-7.163 16-16 16s-16-7.163-16-16v-32h-64v32c0 8.837-7.163 16-16 16s-16-7.163-16-16v-32h-32c-8.837 0-16-7.163-16-16s7.163-16 16-16h32v-32c0-8.837 7.163-16 16-16s16 7.163 16 16v32h64v-32c0-8.837 7.163-16 16-16s16 7.163 16 16v32h32c8.837 0 16 7.163 16 16z"></path>
                  </svg>
                </div>
                <h3 className="text-lg text-pink-500 font-semibold">Social Media Integration</h3>
                <p className="leading-relaxed text-gray-300 text-justify">
                  Easily integrate your events with social media platforms. Share updates,
                  engage with your audience, and amplify your event’s reach.
                </p>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>
      </div>
      <section className="bg-gray-800 py-14">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div
              className="flex flex-col gap-4 items-start justify-center text-left lg:pl-16"
              style={{ flexBasis: "50%" }}
            >
              <div className="flex items-center gap-2">
                <hr className="w-20 h-1 bg-purple-500" />
                <p className="text-purple-500 font-semibold text-lg">Registrations Made Easy</p>
              </div>
              <h1 className="text-3xl md:text-5xl text-pink-500 font-semibold md:leading-normal">
                Security and Reliability
              </h1>
              <p className="text-justify leading-relaxed md:max-w-[90%] py-4 text-gray-300">
                Rest assured that your event data is safe and secure with our web app. We prioritize data protection and employ industry-standard security measures to safeguard your information. Our reliable infrastructure ensures that your event management process remains uninterrupted, allowing you to focus on what matters most – creating exceptional events.
              </p>
              <a
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-purple-600 rounded-full py-3 px-6 text-white shadow-lg"
                href="/signup"
              >
                Get Started
              </a>
            </div>
            <div className="md:pt-16" style={{ flexBasis: "50%" }}>
              <img
                className="w-full rounded-lg shadow-lg"
                src="https://media.istockphoto.com/id/2076886040/photo/businesswomen-using-smartphones-with-screen-shields-and-padlocks-cybersecurity-systems-access.webp?a=1&b=1&s=612x612&w=0&k=20&c=vx5PUDV2G16UWT3A3pkYEu_6uZvcQoT6_T4BmZ5vHoI="
                alt="Security and Reliability"
              />
            </div>
          </div>
        </div>
      </section>


      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 VibeZ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
