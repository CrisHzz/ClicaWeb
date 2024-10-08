"use client";

import React from "react";
import styled from "styled-components";
import useRouter from "next/navigation"

// Define la interfaz para las props
interface CardProps {
  heading?: string;
  para?: string;
}

const Card: React.FC<CardProps> = ({ heading, para }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          {heading && <p className="heading">{heading}</p>}
          {para && <p className="para">{para}</p>}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
    padding: 2px;
    border-radius: 24px;
    overflow: hidden;
    line-height: 1.6;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0rem 6px 13px rgba(10, 60, 255, 0.1),
      0rem 24px 24px rgba(10, 60, 255, 0.09),
      0rem 55px 33px rgba(10, 60, 255, 0.05),
      0rem 97px 39px rgba(10, 60, 255, 0.01),
      0rem 152px 43px rgba(10, 60, 255, 0);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding: 34px;
    border-radius: 22px;
    color: #ffffff;
    overflow: hidden;
    background: #ffffff;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content .heading {
    font-weight: 700;
    font-size: 36px;
    line-height: 1.3;
    z-index: 1;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content .para {
    z-index: 1;
    opacity: 0.8;
    font-size: 18px;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .card::before {
    content: "";
    position: absolute;
    height: 160%;
    width: 160%;
    border-radius: inherit;
    background: #0a3cff;
    background: linear-gradient(to right, #eec861, #ff5757);
    transform-origin: center;
    animation: moving 4.8s linear infinite paused;
    transition: all 0.88s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .card:hover::before {
    animation-play-state: running;
    z-index: -1;
    width: 20%;
  }

  .card:hover .content .heading,
  .card:hover .content .para {
    color: #000000;
  }

  .card:hover {
    box-shadow: 0rem 12px 26px rgba(10, 60, 255, 0.2),
      0rem 48px 48px rgba(10, 60, 255, 0.18),
      0rem 110px 66px rgba(10, 60, 255, 0.1),
      0rem 194px 78px rgba(10, 60, 255, 0.02),
      0rem 304px 86px rgba(10, 60, 255, 0);
    scale: 1.05;
    color: #000000;
  }

  @keyframes moving {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Card;
