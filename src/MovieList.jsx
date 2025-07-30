import axios from "axios";
import { useState, useEffect } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
  });

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://node-practice-nd90.onrender.com/movies"
      );
      setMovies(response.data);
    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://node-practice-nd90.onrender.com/movies", form);
      setForm({ title: "", desc: "" });
      fetchMovies(); // refresh
    } catch (error) {
      console.error("Create Error:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://node-practice-nd90.onrender.com/movies/${id}`
      );
      fetchMovies();
    } catch (error) {
      console.error("Delete Error:", error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <section className='px-4 md:px-30 pt-10 bg-gray-100 min-h-screen'>
      <h1 className='text-4xl font-bold mb-8 text-center'>🍿 Movie List</h1>

      {/* Movie Form */}
      <div className='w-full p-4 bg-gray-50'>
        <h1 className='pl-1 text-xl text-gray-600 mb-2'>
          Enter your Movie name & Description
        </h1>
        <form
          onSubmit={handleCreate}
          className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white p-4 rounded shadow'
        >
          <input
            type='text'
            placeholder='Title'
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className='border p-2 rounded'
            required
          />
          <input
            type='text'
            placeholder='Description'
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className='border p-2 rounded'
            required
          />
          <div className='w-full col-span-1 md:col-end-3 flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-[150px]'
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>

      {/* Movie Table */}
      <div className='overflow-x-auto'>
        <table className='w-full bg-white shadow rounded'>
          <thead className='border-b bg-[#fefdfd] border-gray-300'>
            <tr>
              <th className='text-center font-medium p-3 border-r border-gray-300'>
                No.
              </th>
              <th className='text-center font-medium p-3 border-r border-gray-300'>
                Title
              </th>
              <th className='text-center font-medium p-3 border-r border-gray-300'>
                Description
              </th>
              <th className='text-left font-medium p-3 border-gray-300'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={movie._id} className='border-b border-gray-200'>
                <td className='p-3 text-center border-r border-gray-300'>
                  {index + 1}
                </td>
                <td className='p-3 text-center border-r border-gray-300'>
                  {movie.title}
                </td>
                <td className='p-3 text-center border-r border-gray-300'>
                  {movie.desc}
                </td>
                <td className='p-3 text-left'>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className='bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {movies.length === 0 && (
              <tr>
                <td colSpan='4' className='text-center p-4 text-gray-500'>
                  No movies available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
