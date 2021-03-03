import React from "react"

export const Pagination = ({ postsPerPage, totalPosts, paginate}) => {
    const pageNumber = [];

    for (var i = 1; i <15; i++) {
        pageNumber.push(i)
    }

    return (
        <nav>
            <div className="pagination" style={{ display: "flex", width:"700px", marginLeft:"300px", marginTop:"10px" }}>
                <a onClick={() => paginate("p")} style={{ height: "25px", width: "40px", textAlign: "center", border: "1px solid black" }}>Prev</a>
                <div style={{ display: "flex", flexWrap:"wrap", maxWidth:"400px",overflowY:"hidden" }}>
                {pageNumber.map(number => (
                    <div key={number} style={{ height: "25px", width: "25px", textAlign: "center", border: "1px solid black" }} >
                        <a onClick={() => paginate(number)} className="page-link">{number}</a>
                    </div>
                ))}</div>
                <a onClick={() => paginate("n")} style={{ height: "25px", width: "40px", textAlign: "center", border: "1px solid black" }}>Next</a>
            </div>
        </nav>
    )
}