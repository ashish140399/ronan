import React, { useState } from "react";
import styled from "styled-components";

const Landing = () => {
  const [iptvalue, setIptvalue] = useState(0);
  return (
    <Page>
      <div className="bg-black">
    <div className="relative pb-32 bg-gray-200">
        <div className="absolute inset-0">
            <img
                className="w-full h-full object-cover"
                src="/images/header-background.jpeg"
                alt=""
            />
            <div
                className="absolute inset-0 bg-gray-800 mix-blend-multiply"
                aria-hidden="true"
            ></div>
        </div>
        <div
            className="relative max-w-7xl mx-auto pt-12 pb-24 px-4 sm:pb-32 sm:px-6 lg:px-8"
        >
            <div className="flex items-start space-x-5">
                <div className="flex-shrink-0">
                    <div className="relative">
                        <img
                            className="h-16 w-16 rounded-full"
                            src="/maskable_icon_512x512.png"
                            alt="Ronan Sandford"
                        />
                        <span
                            className="absolute inset-0 shadow-inner rounded-full"
                            aria-hidden="true"
                        ></span>
                    </div>
                </div>
                <div className="pt-1.5">
                    <h1 className="text-3xl font-bold text-gray-100">
                        Ronan Sandford
                    </h1>
                    <p className="text-base font-medium text-gray-400">
                        Game Developer, Web3 Architect and Creative Tinkerer.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <section
        className="-mt-32 max-w-7xl mx-auto relative z-10 pb-8 px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
    >
        <div
            className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8"
        >
            <div className="flex flex-col bg-black rounded-2xl shadow-xl">
                <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                    <div
                        className="absolute top-0 inline-block rounded-xl shadow-lg transform -translate-y-1/2"
                    >
                        <img
                            className="h-16 w-16"
                            src="/images/portfolio/conquest-icon.png"
                            alt="game developer"
                        />
                    </div>
                    <h3 className="text-xl font-medium text-gray-100">
                        Game Developer
                    </h3>
                    <p className="mt-4 text-base text-gray-500">
                        Professional Game Developer since 2010. Founder of
                        <a className="underline" href="https://etherplay.io"
                            >Etherplay</a
                        >, now working on my latest crypto native game:
                        <a
                            href="https://conquest.eth.limo"
                            className="underline"
                            >conquest.eth</a
                        >
                    </p>
                </div>
            </div>
            <div className="flex flex-col bg-black rounded-2xl shadow-xl">
                <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                    <div
                        className="absolute top-0 inline-block rounded-xl shadow-lg transform -translate-y-1/2"
                    >
                        <img
                            className="h-16 w-16"
                            src="./images/portfolio/hardhat-deploy-icon.png"
                            alt="web3 architect"
                        />
                    </div>
                    <h3 className="text-xl font-medium text-gray-100">
                        Web3 Architect
                    </h3>
                    <p className="mt-4 text-base text-gray-500">
                        Participating in Web3 Standard like
                        <a
                            className="underline"
                            href="https://eips.ethereum.org/EIPS/eip-1155"
                            >EIP-1155</a
                        >
                        while also building tools for the web3 /
                        <a
                            href="https://ethereum.org"
                            target="_blank"
                            className="underline"
                            >ethereum</a
                        >
                        ecosystem, including
                        <a
                            className="underline"
                            href="https://github.com/wighawag/hardhat-deploy"
                            >hardhat-deploy</a
                        >
                        and
                        <a
                            className="underline"
                            href="https://jolly-roger.eth.limo"
                            >jolly-roger</a
                        >
                    </p>
                </div>
            </div>
            <div className="flex flex-col bg-black rounded-2xl shadow-xl">
                <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                    <div
                        className="absolute top-0 inline-block rounded-xl shadow-lg transform -translate-y-1/2"
                    >
                        <img
                            className="h-16 w-16"
                            src="./images/portfolio/mandalas-icon.png"
                            alt="tinkerer"
                        />
                    </div>
                    <h3 className="text-xl font-medium text-gray-100">
                        Creative Tinkerer
                    </h3>
                    <p className="mt-4 text-base text-gray-500">
                        I like to tinker with technology in general and been
                        delving in generative art and fully on-chain NFTs with
                        <a
                            className="underline"
                            href="https://mandalas.eth.limo"
                            >Mandalas</a
                        >
                        and
                        <a className="underline" href="https://bleeps.art"
                            >Bleeps</a
                        >
                    </p>
                </div>
            </div>
        </div>
    </section>
</div>

    </Page>
  );
};

const Page = styled.div``;

export default Landing;
