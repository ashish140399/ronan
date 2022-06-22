import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { data } from "./data";

const Portfolio = () => {
  return (
    <>
        <Navbar/>

        <div
            className="relative bg-gray-950 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
        >
            <div className="absolute inset-0">
                <div className="bg-black h-1/3 sm:h-2/3"></div>
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                    <h2
                        className="text-3xl tracking-tight font-extrabold text-gray-100 sm:text-4xl"
                    >
                        Portfolio
                    </h2>
                </div>
                <div
                    className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none"
                >
                    {
                        data.map(item => <Card data={item}/>)
                    }
                </div>
            </div>
        </div>

    </>
  );
};



export default Portfolio;
