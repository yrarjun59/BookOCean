import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, keyword = "", isAdmin = false, route }) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? {
                    pathname: route,
                    search: `?keyword=${keyword}&page=${x + 1}`,
                  }
                : {
                    pathname: route,
                    search: `?keyword=${keyword}&page=${x + 1}`,
                  }
            }
          >
            <Pagination.Item
              style={{ background: "red" }}
              active={x + 1 === page}
            >
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
