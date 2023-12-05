import PropTypes from "prop-types";

const Results = ({ results }) => {
  if (!results) {
    return (
      <>
        <div className="text-center" role="status">
          <span className="text text-danger align-self-center">
            No results found
          </span>
        </div>
      </>
    );
  }

  return (
    <div className="">
      {
        // eslint-disable-next-line react/prop-types
        results.map((result) => (
          <div className="d-flex mb-3" key={result.link}>
            <div className="me-3">
              <img
                width={200}
                height={200}
                src={result.img}
                alt={result.title}
              />
            </div>
            <div className="">
              <h6>{result.title}</h6>
              <p>{result.price}</p>

              <a href={result.link} target="_blank" rel="noopener noreferrer">
                View on Amazon
              </a>
            </div>
          </div>
        ))
      }
    </div>
  );
};
Results.propTypes = {
  results: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.string,
    img: PropTypes.string,
    link: PropTypes.string,
  }),
};

export default Results;
