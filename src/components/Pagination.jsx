import React from 'react'

export default function Pagination({ currentPage, setCurrentPage, totalPage }) {
    return (
        <div>

            <button disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Previous
            </button>

            {[...Array(totalPage)].map((_, index) => (
                <button key={index} onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                </button>
            ))}


            <button disabled={currentPage === totalPage}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    )
}
