import Button from "./Button";

function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <footer className="pagination-row">
      <Button type="button" disabled={currentPage === 1} onClick={onPrev}>
        Prev
      </Button>
      <span>
        Page {currentPage} / {totalPages}
      </span>
      <Button type="button" disabled={currentPage === totalPages} onClick={onNext}>
        Next
      </Button>
    </footer>
  );
}

export default Pagination;
