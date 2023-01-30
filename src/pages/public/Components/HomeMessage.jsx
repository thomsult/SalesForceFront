import React from "react";

export default function HomeMessage() {
  return (
    <section className=" hidden md:max-w-md md:text-white md:px-8 md:m-auto md:flex md:flex-col items-center justify-center ">
      <h1 className="text-5xl font-black ">
        Bienvenue chez <span className="text-indigo-600">CellsForce</span>
      </h1>
      <p className="pt-6 text-2xl leading-medium">
        CellsForce est une solution d'idéation innovante. <br />
        <br />
        Elle vous permettra de visualiser, en temps réel, les idées de vos
        collaborateurs, afin de prendre les bonnes décisions. <br />
        <br />
        Laissez libre cours à votre imagination et à votre créativité, et
        rejoignez-nous dès maintenant !
      </p>
    </section>
  );
}
