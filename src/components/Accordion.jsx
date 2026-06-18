import { useState } from "react";

const faqData = [
    {
        id: 1,
        question: "What is React?",
        answer:
            "React is a JavaScript library for building user interfaces.",
    },
    {
        id: 2,
        question: "What is Vite?",
        answer:
            "Vite is a fast frontend build tool and development server.",
    },
    {
        id: 3,
        question: "What is JSX?",
        answer:
            "JSX allows you to write HTML-like syntax inside JavaScript.",
    },
];

export default function App() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "50px auto",
                padding: "20px",
            }}
        >
            <h1>Accordion Example</h1>

            {faqData.map((item, index) => (
                <div
                    key={item.id}
                    style={{
                        border: "1px solid #ddd",
                        marginBottom: "10px",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    <button
                        onClick={() => handleToggle(index)}
                        style={{
                            width: "100%",
                            padding: "15px",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "left",
                            fontSize: "16px",
                            background: "#f5f5f5",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        {item.question}
                        <span>
                            {openIndex === index ? "-" : "+"}
                        </span>
                    </button>

                    {openIndex === index && (
                        <div
                            style={{
                                padding: "15px",
                                background: "#fff",
                            }}
                        >
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}