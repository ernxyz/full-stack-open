import Togglable from "./Togglable";
import FormBlog from "./FormBlog";

const TogglableBlogForm = ({ user, blogFormRef, addBlog }) => {
  if (!user) {
    return;
  }

  return (
    <Togglable btnLabel="add blog" ref={blogFormRef}>
      <FormBlog addBlog={addBlog} />
    </Togglable>
  );
};

export default TogglableBlogForm;
