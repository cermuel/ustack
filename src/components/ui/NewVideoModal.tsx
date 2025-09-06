import type { Dispatch } from "react";
import type { NewVideo } from "../../types";

const NewVideoModal = ({
  form,
  setForm,
  handleSubmit,
  close,
}: {
  form: NewVideo;
  setForm: Dispatch<NewVideo>;
  close: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-11/12 max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add a New Video
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Video Name"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="url"
            placeholder="YouTube URL"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            required
          />
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewVideoModal;
