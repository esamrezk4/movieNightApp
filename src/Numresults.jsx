export default function Numresults({ movies }) {
  console.log(movies);
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
