import Togglable from "./Togglable";
import FormBlog from "./FormBlog";
import { useLoginValue } from "./LoginContextProvider";

const TogglableBlogForm = ({ blogFormRef, addBlog }) => {
  const user = useLoginValue();

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
