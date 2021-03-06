import React, { useState, useEffect, useRef} from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessagge, setShowSuccessMessagge] = useState(false);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const commentsEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name');
        emailEl.current.value = window.localStorage.getItem('email');
    }, [])

    const handleCommentSubmission = () => {
        setError(false);

        const { value: comment } = commentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { checked: storeData } = storeDataEl.current;

        if(!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj = { name, email, comment, slug };

        if(storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('email');
        }

        submitComment(commentObj)
        .then((res) => {
            setShowSuccessMessagge(true);
            setTimeout(() => {
                setShowSuccessMessagge(false);
            }, 3000);
        })
    }

    return (
        <div className="bg-neutral-800 shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4 bg-neutral-800 text-neutral-100 border-neutral-700">Leave a Reply</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea 
                    ref={commentEl} 
                    className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Comment"
                    name="Comment"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input 
                    type="text"
                    ref={nameEl}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Name"
                    name="Name"
                />
                <input 
                    type="text"
                    ref={emailEl}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Email"
                    name="Email"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input ref={storeDataEl} type="checkbox" id="storeData" name="storeDate" value="true" />
                    <label className="text-neutral-500 cursor-pointer ml-2" htmlFor="storeData">Save my e-mail and name for the next time I comment.</label>
                </div>
            </div>
            {error && <p className="text-xs text-red-500">All fields are required</p>}
            <div className="mt-8">
                <button    
                    type="button" onClick={handleCommentSubmission}
                    onClick={handleCommentSubmission}
                    className="transition duration-200 transform hover:-translate-y-1 transition  bg-orange-600  ease hover:bg-amber-400 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                    >
                    Post Comment
                </button>
                {showSuccessMessagge && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submited for review</span>}
            </div>
        </div>
    )
}

export default CommentsForm
