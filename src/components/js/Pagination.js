import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    let startPage;
    let endPage;

    if (totalPages <= 4) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 2) {
            startPage = 1;
            endPage = 4;
        } else if (currentPage >= totalPages - 1) {
            startPage = totalPages - 3;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 2;
        }
    }

    return (
        <nav aria-label="Pagination">
            <ul className="pagination justify-content-center">
                {currentPage > 1 && (
                    <li className="ComprarFinal Pagination_Button">
                        <button
                            className="ComprarFinal Pagination_Button"
                            onClick={() => onPageChange(currentPage - 1)}
                            aria-label="Anterior"
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                )}

                {startPage > 1 && (
                    <li className="ComprarFinal Pagination_Button">
                        <button
                            className="ComprarFinal  Pagination_Button"
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </button>
                    </li>
                )}

                {startPage > 2 && (
                    <li className="ComprarFinal disabled">
                        <span className="page-link">...</span>
                    </li>
                )}

                {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
                    <li
                        key={startPage + index}
                        className={`ComprarFinal Pagination_Button${currentPage === startPage + index ? ' active' : ''}`}
                    >
                        <button
                            className="ComprarFinal Pagination_Button"
                            onClick={() => onPageChange(startPage + index)}
                        >
                            {startPage + index}
                        </button>
                    </li>
                ))}

                {endPage < totalPages - 1 && (
                    <li className="ComprarFinal disabled">
                        <span className="page-link">...</span>
                    </li>
                )}

                {endPage < totalPages && (
                    <li className="ComprarFinal Pagination_Button">
                        <button
                            className="ComprarFinal Pagination_Button"
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </li>
                )}

                {currentPage < totalPages && (
                    <li className="ComprarFinal Pagination_Button">
                        <button
                            className="ComprarFinal Pagination_Button"
                            onClick={() => onPageChange(currentPage + 1)}
                            aria-label="Siguiente"
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
