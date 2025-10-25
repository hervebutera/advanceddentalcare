const blogOpenHead = document.getElementById("blog-open-head");
const blogTitle = document.getElementById("blog-title");
const blogWritterImage = document.getElementById("blog-writer-image");
const blogWritterName = document.getElementById("blog-writter-name");
const blogCoverImage = document.getElementById("blog-cover-image");
const blogsSimillarWrapper = document.getElementById("blogs-simillar-wrapper");
const blogCategoryName = document.getElementById("blog-category-name");
const blogHeadSkeleton = document.getElementById("blog-head-skeleton");
const blogHeadContent = document.getElementById("blog-head-content");
const blogArticleSkeleton = document.getElementById("blog-article-skeleton");
const blogArticleText = document.getElementById("blog-articletext");

let blogs = [];
let blogInfo = {};
let blogId = "";

const fetchBlogInfo = async () => {
  try {
    blogId = getQueryParam("blogId");

    // Show skeletons
    blogHeadSkeleton.classList.remove("hidden");
    blogArticleSkeleton.classList.remove("hidden");
    blogHeadContent.classList.add("hidden");
    blogArticleText.classList.add("hidden");

    const response = await fetch(`${API_URL}/blog/${blogId}`);
    blogInfo = await response.json();
    fetchBlogs();

    // Populate data
    blogCategoryName.innerHTML = blogInfo.category.name;
    blogTitle.innerHTML = blogInfo.title;
    blogWritterImage.src = blogInfo.user.profileimageurl;
    blogWritterName.innerHTML = `${blogInfo.user.firstname} ${blogInfo.user.lastname}`;
    blogCoverImage.src = blogInfo.thumbnailimageurl;

    const cleanEditorOutput = DOMPurify.sanitize(blogInfo.articletext);
    blogArticleText.innerHTML = cleanEditorOutput;

    // Hide skeletons with fade-in
    setTimeout(() => {
      blogHeadSkeleton.classList.add("hidden");
      blogArticleSkeleton.classList.add("hidden");
      blogHeadContent.classList.remove("hidden");
      blogArticleText.classList.remove("hidden");
      blogHeadContent.classList.add("fade-in");
      blogArticleText.classList.add("fade-in");
    }, 400);
  } catch (error) {
    console.log(error);
    blogHeadSkeleton.classList.add("hidden");
    blogArticleSkeleton.classList.add("hidden");
    blogArticleText.innerHTML =
      "<p class='text-center text-gray-600'>Error loading blog. Please try again later.</p>";
    blogArticleText.classList.remove("hidden");
  }
};

const fetchBlogs = async () => {
  try {
    if (Object.values(blogInfo).length) {
      const response = await fetch(
        `${API_URL}/blog/category/${blogInfo.category.id}`
      );
      blogs = await response.json();

      const filteredBlogs = blogs.filter((blog) => blog.id !== Number(blogId));

      AppendBlogs(filteredBlogs);
    }
  } catch (error) {
    console.log(error);
  }
};

const AppendBlogs = (data) => {
  blogsSimillarWrapper.innerHTML = "";
  if (data.length) {
    data.map((blog) => {
      return (blogsSimillarWrapper.innerHTML += `
        <a href="./blog-open.html?blogId=${blog.id}">
          <div class="swiper-slide min-w-[280px] sm:min-w-[300px] sm:max-w-[300px] bg-white rounded-2xl p-6 space-y-4 card-hover-styles fade-in">
            <img class="w-full sm:w-64 h-52 object-cover rounded-xl" src="${blog.thumbnailimageurl}" alt="">
            <div class="space-y-2">
              <div>
                <span class="text-xs sm:text-sm text-grayText font-medium px-2 py-1.5 border-2 border-gray-200 rounded-full">
                  ${blog.category.name}
                </span>
              </div>
              <h2 class="text-base font-semibold white-card-text-title">${blog.title}</h2>
            </div>
          </div>
        </a>
      `);
    });
  } else {
    blogsSimillarWrapper.innerHTML = `<p class="text-center text-gray-600">No similar blogs found.</p>`;
  }
};

fetchBlogInfo();
