const blogsBlogsWrapper = document.getElementById("blogs-blogs-wrapper");
const skeletonWrapper = document.getElementById("skeleton-wrapper");
let blogs = [];

const categoriesWrapper = document.getElementById("categories-wrapper");
let categories = [];
let categoryId = "";

const fetchBlogs = async () => {
  try {
    const response = await fetch(`${API_URL}/blog`);
    blogs = await response.json();
    if (blogs.length) {
      skeletonWrapper.classList.add("hidden"); // hide skeleton
      AppendBlogs(blogs);
    } else {
      skeletonWrapper.classList.add("hidden");
      blogsBlogsWrapper.innerHTML = `<p class="text-center text-gray-600 w-full">No blogs currently.</p>`;
    }
  } catch (error) {
    console.log(error);
    skeletonWrapper.classList.add("hidden");
    blogsBlogsWrapper.innerHTML = `<p class="text-center text-red-500 w-full">Failed to load blogs.</p>`;
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/category`);
    categories = await response.json();
    AppendCategories(categories);
  } catch (error) {
    console.log(error);
  }
};

const AppendCategories = (data) => {
  categoriesWrapper.innerHTML = `
    <li>
      <button
        class="text-sm font-medium px-2 py-1 ${
          categoryId === ""
            ? "text-primaryBlue bg-secondaryBlue/40"
            : "text-grayText border-2 border-gray-200 hover:bg-gray-100"
        } rounded-full duration-300 transform"
        onclick="filterByCategory('')"
      >
        All blogs
      </button>
    </li>
  `;

  if (data.length) {
    data.map((category) => {
      return (categoriesWrapper.innerHTML += `
        <li>
          <button
            class="text-sm font-medium px-2 py-1 ${
              categoryId === category.id
                ? "text-primaryBlue bg-secondaryBlue/40"
                : "text-grayText border-2 border-gray-200 hover:bg-gray-100"
            } rounded-full duration-300 transform"
            onclick="filterByCategory('${category.id}')"
          >
            ${category.name}
          </button>
        </li>
      `);
    });
  }
};

const filterByCategory = (id) => {
  if (id !== "") {
    categoryId = Number(id);
    const filteredBlogs = blogs.filter(
      (blog) => blog.category.id === Number(id)
    );

    AppendCategories(categories);
    AppendBlogs(filteredBlogs);
  } else {
    categoryId = "";
    AppendCategories(categories);
    AppendBlogs(blogs);
  }
};

const AppendBlogs = (data) => {
  blogsBlogsWrapper.innerHTML = "";
  if (data.length) {
    data.map((blog) => {
      return (blogsBlogsWrapper.innerHTML += `
        <a
          href="${`./blog-open.html?blogId=${encodeURIComponent(
            blog.id
          )}&title=${encodeURIComponent(
            String(blog.title)
              .trim()
              .toLowerCase()
              .replace(/[^a-z0-9\s]/g, "")
              .replace(/\s+/g, "-")
          )}`}"
        >
          <div
            class="white-card min-w-[280px] sm:min-w-[305px] sm:max-w-[305px] bg-white rounded-2xl p-6 space-y-4 cursor-pointer card-hover-styles sm:hover:shadow-md sm:hover:shadow-black/30"
          >
            <img
              class="white-card-image w-full h-44 object-cover rounded-xl"
              src="${blog.thumbnailimageurl}"
              alt=""
            />
            <div class="white-card-text space-y-2 mb-4">
              <div>
                <span
                  class="text-xs sm:text-sm text-grayText font-medium px-2 py-1.5 border-2 border-gray-200 rounded-full"
                >
                  ${blog.category.name}
                </span>
              </div>
              <h2
                class="white-card-text-title text-base font-semibold line-clamp-3"
              >
                ${blog.title}
              </h2>

              <a
                href="${`./blog-open.html?blogId=${encodeURIComponent(
                  blog.id
                )}&title=${encodeURIComponent(
                  String(blog.title)
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, "")
                    .replace(/\s+/g, "-")
                )}`}"

                class="sm:hidden w-fit px-3 py-2 text-sm text-white font-semibold rounded-full bg-primaryBlue hover:bg-secondaryBlue"
              >
                <span>Read More</span>
              </a>
            </div>
            
          </div>
        </a>
      `);
    });
  } else {
    blogsBlogsWrapper.innerHTML = `<p class="text-center text-gray-600 w-full">No blogs currently.</p>`;
  }
};

fetchCategories();
fetchBlogs();
