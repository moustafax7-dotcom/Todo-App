import React, { useContext, useState } from 'react';
import { userContext } from '../../Context/Usercontext';
export default function PackingList() {
  const { items, setitem, isDarkMode, setIsDarkMode } = useContext(userContext);
  const [activeFilter, setActiveFilter] = useState('all'); //for selected all active

  // sort item
  const filteredItems = items.filter((task) => {
    if (activeFilter === 'all') return true; //show all
    if (activeFilter === 'active') return !task.package; // show active only
    if (activeFilter === 'completed') return task.package; // show completed
    return true;
  });

  function deleteTask(id) {
    setitem(items.filter((task) => task.id !== id));
  }

  //change stat complete or no
  const toggleComplete = (id) => {
    const updatedItems = items.map((task) =>
      task.id === id ? { ...task, package: !task.package } : task
    );
    setitem(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems)); //in local storge
  };

  return (
    <>
      <section className={`pt-2 min-h-screen ${isDarkMode ? "bg-[#161722]" : "bg-[hsl(0,0%,98%)]"}`}>
        <ul className="w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto   shadow-xl">

          {filteredItems.length === 0 ? (
            <li className={`shadow-lg ${isDarkMode ? "bg-[#25273C] text-[hsl(0,0%,73%)]" : "bg-[hsl(0,0%,98%)] text-[#25273C]"} border-b ${isDarkMode ? "border-[hsl(233,14%,35%)]" : "border-[hsl(233,11%,84%)1]"} p-5 w-[100%] flex items-center justify-center`}>
              No todo items left..!
            </li>
          ) : (
            filteredItems.map((task) => (
              <li
                key={task.id}
                className={`shadow-lg ${isDarkMode ? "bg-[#25273C] text-[hsl(0,0%,73%)]" : "bg-[hsl(0,0%,98%)] text-[#25273C]"} border-b ${isDarkMode ? "border-[hsl(233,14%,35%)]" : "border-[hsl(233,11%,84%)1]"} group p-5 w-[100%] flex items-center ${task.package ? 'line-through text-gray-500' : ''
                  }`}
              >
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`me-3 h-6 w-6 flex items-center justify-center rounded-full border-2 transition-all ${task.package
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-400 hover:border-blue-500'
                    }`}
                >
                  {task.package && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="white"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                {task.toDo}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-lg font-bold ms-auto opacity-0 group-hover:opacity-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
                  </svg>
                </button>
              </li>
            ))
          )}

          <div className={`flex flex-col  justify-center items-center sm:justify-between sm:flex-row actions shadow-lg ${isDarkMode ? "bg-[#25273C] text-[hsl(0,0%,73%)]" : "bg-[hsl(0,0%,98%)] text-[#25273C]"}  mt-4 p-5 rounded-b-md`}>
            <p className="left-items text-[hsl(234,11%,52%)]">
              <span>{items.filter((task) => !task.package).length}</span> items left
            </p>

            <div className="filters clear-margin flex justify-center my-3  gap-3 ">
              <button
                onClick={() => setActiveFilter('all')}
                className={` ${activeFilter === 'all' ? 'text-[#3a7bfd]' : ''}`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('active')}
                className={` ${activeFilter === 'active' ? 'text-[#3a7bfd]' : ''}`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveFilter('completed')}
                className={` ${activeFilter === 'completed' ? 'text-[#3a7bfd]' : ''}`}
              >
                Completed
              </button>
            </div>
            <button
              onClick={() => {
                // remove all completed task
                const newItems = items.filter((task) => !task.package);
                localStorage.setItem('items', JSON.stringify(newItems));
                setitem(newItems);
              }}
              className="w-fit  text-[hsl(234,11%,52%)]"
            >
              Clear Completed
            </button>
          </div>
        </ul>
      </section>
    </>
  );
}
