import React, { useEffect } from "react";
import { KTSVG } from "../../helpers/components";
import { PageTitle } from "../../layout/core";
import { marketingData } from "./data/MarketingData";

const Resources = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageTitle breadcrumbs={[]}>{"Resources"}</PageTitle>

      <div className="row g-10 mb-10">
        {marketingData.map((market, index) => (
          <div className="col-md-4" key={index}>

            <div className="card mb-5">
              <a
                href={market.link}
                target="_blank"
                rel="noreferrer"
                className="d-block opacity-75-hover hoverable">
                <img className="card-img-top" src={market.avatar} alt="" />
                <div className="card-body">
                  <h5 className="card-title">Title 1 and Go</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                    the card's content.</p>
                </div>
              </a>
            </div>

            <a
              href={market.link}
              target="_blank"
              rel="noreferrer"
              className="d-block opacity-75-hover hoverable"
            >
              <img className="rounded w-100 h-auto" src={market.avatar} alt="" />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
export { Resources };
