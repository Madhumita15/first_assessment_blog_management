
import { Link } from "react-router-dom";
import { Rss, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      <section className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
            <Rss className="h-8 w-8 text-purple-700" />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-600">
            Blog Management System
          </p>

          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Create, Manage & Share
            <span className="block text-purple-700">
              Your Stories
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A simple and powerful platform to create, manage and publish
            engaging blog content. Write your ideas, organize your posts,
            and share them with your readers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white transition hover:bg-purple-800"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>

           
          </div>
        </div>
      </section>

      <section className="border-t border-purple-100 bg-purple-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Everything You Need
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            Manage your blog content easily with a clean and simple
            experience.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100">
                <Rss className="text-purple-700" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Create Blogs
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Write and publish meaningful content with an easy-to-use
                blog management system.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100">
                <Rss className="text-purple-700" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Manage Content
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Organize, edit and manage your blog posts from one place.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100">
                <Rss className="text-purple-700" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Share Ideas
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Publish your thoughts and let readers discover your content.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;