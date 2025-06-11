import React, { useState, useEffect } from "react";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";
import { motion, AnimatePresence } from "framer-motion";

const UploadMedia = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (index) => {
    setFiles((prev) => {
      const newList = [...prev];
      URL.revokeObjectURL(newList[index].preview);
      newList.splice(index, 1);
      return newList;
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select at least one file.");
      return;
    }
    // TODO: Add actual upload logic here
    console.log("Uploading files:", files.map((f) => f.file.name));
    alert("Media uploaded successfully (mock)");
  };

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  return (
    <OrganizerSidebarLayout>
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          📤 Upload Media
        </h2>

        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="block w-full text-gray-700 mb-6 cursor-pointer rounded border border-gray-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />

          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 mb-6"
              >
                {files.map((item, index) => (
                  <motion.div
                    key={item.preview}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="border rounded-lg shadow-sm p-3 flex flex-col items-center bg-gray-50"
                  >
                    {item.file.type.startsWith("image/") ? (
                      <img
                        src={item.preview}
                        alt={`preview-${index}`}
                        className="w-40 h-40 object-cover rounded-md mb-3 border"
                      />
                    ) : item.file.type.startsWith("video/") ? (
                      <video
                        src={item.preview}
                        controls
                        className="w-40 h-40 rounded-md mb-3 border object-cover"
                      />
                    ) : null}

                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm truncate">{item.file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
                        aria-label={`Remove file ${item.file.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Upload All
          </button>
        </form>
      </div>
    </OrganizerSidebarLayout>
  );
};

export default UploadMedia;
