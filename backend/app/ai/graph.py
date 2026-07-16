from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from app.ai.agent import generate_summary


class AIState(TypedDict):
    notes: str
    summary: str


def summary_node(state: AIState):
    summary = generate_summary(state["notes"])
    return {"summary": summary}


builder = StateGraph(AIState)
builder.add_node("summary", summary_node)
builder.add_edge(START, "summary")
builder.add_edge("summary", END)

graph = builder.compile()


def run_ai(notes: str):
    result = graph.invoke(
        {
            "notes": notes,
            "summary": "",
        }
    )

    return result["summary"]