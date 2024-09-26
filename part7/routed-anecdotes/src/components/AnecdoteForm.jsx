import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const AnecdoteForm = (props) => {

  const navigate = useNavigate()

  const { reset: resetContent, ...content } = useField("text")
  const { reset: resetAuthor, ...author } = useField("text")
  const { reset: resetUrl, ...url } = useField("url")

  const handleSubmit = (e) => {
    e.preventDefault()

    props.addNew({
      content: content.value,
      author: author.value,
      url: url.value,
      votes: 0
    })

    navigate("/")
  }

  const resetFields = () => {
    resetContent()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <br />
          <input {...content} />
          {/* <input type={content.type} value={content.value} onChange={content.onChange} /> */}
        </div>
        <div>
          author <br />
          <input {...author} />
          {/* <input type={author.type} value={author.value} onChange={author.onChange} /> */}
        </div>
        <div>
          url for more info <br />
          <input {...url} />
          {/* <input type={url.type} value={url.value} onChange={url.onChange} /> */}
        </div>
        <button>create</button>
        <button type="button" onClick={resetFields}>reset</button>
      </form>
    </div>
  )

}

export default AnecdoteForm