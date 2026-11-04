# Complete Generative AI, LLM and RAG Learning Roadmap

**Starting point:** Comfortable with Python  
**End goal:** Become capable of designing, developing, evaluating and deploying production-grade RAG and Agentic RAG applications.

---

# PHASE 1: LLM FUNDAMENTALS

## 1. Introduction to Generative AI

Understand the fundamentals of Generative AI before working with LLMs.

Topics:
- What is Artificial Intelligence?
- What is Machine Learning?
- What is Deep Learning?
- What is Generative AI?
- Discriminative AI vs Generative AI
- What are Foundation Models?
- What are Large Language Models?
- Types of language models
- How LLMs differ from traditional ML models
- Popular LLM providers and open-source models
  - OpenAI
  - Anthropic
  - Google Gemini
  - Meta Llama
  - Mistral

**Practical exercise:**
- Explore different LLMs.
- Compare their responses to the same set of prompts.
- Understand their strengths and limitations.

## 2. Understanding How LLMs Work

Topics:
- What is a neural network?
- Introduction to Transformer architecture
- Encoder vs Decoder architecture
- Encoder-decoder models
- Self-attention mechanism
- Multi-head attention
- Positional encoding
- Feed-forward neural networks
- Transformer architecture
- Pre-training and fine-tuning
- Next-token prediction
- How an LLM generates responses
- Parameters and model weights

Important concepts:
- Tokens
- Tokenization
- Vocabulary
- Context window
- Input tokens and output tokens
- Temperature
- Top-K sampling
- Top-P sampling
- Max output tokens
- Model parameters

**Practical exercises:**
- Explore tokenization using a tokenizer.
- Calculate token counts for different prompts.
- Experiment with temperature and other generation parameters.
- Explore Transformer architecture conceptually.

## 3. Prompt Engineering

Topics:
- What is prompt engineering?
- Zero-shot prompting
- One-shot prompting
- Few-shot prompting
- Role-based prompting
- System prompts and user prompts
- Contextual prompting
- Instruction-based prompting
- Chain-of-thought prompting
- Structured output prompting
- JSON output generation
- Prompt templates
- Prompt variables
- Prompt chaining
- Prompt injection fundamentals
- Hallucination prevention techniques

**Practical project:**
Build a prompt-based application that:
- Accepts user input.
- Classifies the input.
- Extracts structured information.
- Returns a JSON response.
- Handles invalid or unexpected inputs.

---

# PHASE 2: WORKING WITH LLM APIS

## 4. LLM API Integration

Learn how to interact with LLMs programmatically.

Topics:
- What is an LLM API?
- API keys and authentication
- API requests and responses
- Chat completion APIs
- Message roles
- System, user and assistant messages
- Model selection
- Temperature and generation parameters
- Streaming responses
- Async API calls
- Rate limits
- Token usage and cost calculation
- Error handling
- Retry mechanisms
- Timeouts
- Conversation history management

Learn:
- OpenAI API
- Anthropic API
- Gemini API

**Practical project:**
Build a command-line AI chatbot using an LLM API.

Features:
- Multi-turn conversation
- Conversation history
- Streaming responses
- Token usage tracking
- Error handling

## 5. Structured Outputs and Function Calling

Topics:
- Structured outputs
- JSON mode
- JSON schema
- Pydantic models
- Output validation
- Function calling
- Tool calling
- Tool definitions
- Tool arguments
- Tool execution
- Tool response handling
- Multiple tool calls
- Parallel tool calls
- Tool-calling limitations

**Practical project:**
Build an AI assistant that can:
- Extract structured information from text.
- Call a calculator function.
- Retrieve information using a custom function.
- Return validated JSON responses.

---

# PHASE 3: EMBEDDINGS AND VECTOR DATABASES

## 6. Understanding Embeddings

This is one of the most important foundations for RAG.

Topics:
- What are embeddings?
- Why do we need embeddings?
- Word embeddings vs sentence embeddings
- Text embeddings
- Document embeddings
- Embedding models
- Dense embeddings
- Sparse embeddings
- Vector representation
- Vector dimensions
- Semantic similarity
- Cosine similarity
- Dot product
- Euclidean distance
- Similarity search
- Embedding model selection
- Embedding normalization
- Embedding limitations

Learn embedding models from:
- OpenAI
- Sentence Transformers
- Hugging Face

**Practical exercises:**
- Generate embeddings for sentences.
- Compare semantically similar sentences.
- Calculate cosine similarity.
- Compare different embedding models.
- Understand how embedding dimensions affect storage and search.

## 7. Vector Databases

Topics:
- What is a vector database?
- Why do we need vector databases?
- Traditional databases vs vector databases
- Vector indexing
- Approximate nearest neighbor search
- Exact nearest neighbor search
- HNSW indexing
- IVF indexing
- Metadata storage
- Metadata filtering
- Similarity search
- Top-K retrieval
- Vector upsert and deletion
- Collection management
- Persistent vector storage

Learn these technologies in sequence:

1. FAISS
2. ChromaDB
3. PostgreSQL with pgvector
4. Pinecone (managed vector database)

**Practical project:**
Build a semantic search application:
- Ingest text documents.
- Generate embeddings.
- Store embeddings.
- Accept a search query.
- Retrieve semantically similar documents.
- Apply metadata filtering.

---

# PHASE 4: RAG FUNDAMENTALS

## 8. Introduction to Retrieval-Augmented Generation

Topics:
- What is RAG?
- Why do we need RAG?
- Limitations of standalone LLMs
- LLM vs RAG
- RAG architecture
- Retrieval pipeline
- Indexing pipeline
- Query pipeline
- Offline and online RAG workflows
- Knowledge bases
- Grounded generation
- Context injection
- RAG vs fine-tuning
- When to use RAG
- When not to use RAG

Understand the complete RAG architecture:

Document → Parsing → Chunking → Embedding → Vector Database → Retrieval → Context Construction → LLM → Response.

## 9. Document Ingestion and Data Loading

Topics:
- Document ingestion pipelines
- PDF ingestion
- DOCX ingestion
- TXT ingestion
- CSV ingestion
- HTML ingestion
- Markdown ingestion
- Web page ingestion
- JSON ingestion
- Data cleaning
- Text extraction
- Document metadata
- Document loaders
- OCR fundamentals
- Handling scanned PDFs
- Table extraction
- Image and multimodal document ingestion

Libraries:
- PyMuPDF
- pypdf
- python-docx
- BeautifulSoup
- Unstructured
- Docling

## 10. Document Chunking Strategies

Understand why chunking is critical for retrieval quality.

Topics:
- What is chunking?
- Why do we need chunking?
- Fixed-size chunking
- Character-based chunking
- Token-based chunking
- Recursive character chunking
- Sentence-based chunking
- Paragraph-based chunking
- Semantic chunking
- Document-based chunking
- Overlapping chunks
- Chunk size optimization
- Chunk overlap optimization
- Metadata-aware chunking
- Parent-child chunking
- Contextual chunking

**Practical exercise:**
Take a large PDF and implement multiple chunking strategies. Compare their retrieval quality.

## 11. Building Your First End-to-End RAG Application

Topics:
- Document loading
- Text extraction
- Chunking
- Embedding generation
- Vector storage
- Query embedding
- Similarity search
- Top-K retrieval
- Context construction
- Prompt construction
- LLM generation
- Response generation
- Source attribution
- Conversation history

**Major project 1: PDF Question Answering System**

Features:
- Upload multiple PDFs.
- Extract and split document content.
- Generate embeddings.
- Store vectors in ChromaDB.
- Ask questions about uploaded documents.
- Retrieve relevant chunks.
- Generate answers using an LLM.
- Display source documents and page references.

---

# PHASE 5: RAG FRAMEWORKS

## 12. LangChain Fundamentals

Learn LangChain after understanding how basic RAG works without relying on a framework.

Topics:
- LangChain architecture
- Models
- Chat models
- Prompt templates
- Output parsers
- Document loaders
- Text splitters
- Embeddings
- Vector stores
- Retrievers
- Chains
- LCEL (LangChain Expression Language)
- Runnable interfaces
- Runnable sequences
- Runnable parallel
- Runnable passthrough
- Runnable lambda
- Callbacks
- Streaming
- Async execution
- Memory and conversation history
- Retrieval chains

## 13. LlamaIndex Fundamentals

Topics:
- LlamaIndex architecture
- Documents
- Nodes
- Node parsers
- Indexes
- VectorStoreIndex
- StorageContext
- Query engines
- Retrievers
- Response synthesizers
- Postprocessors
- Metadata filters
- Document management
- Query transformations

Understand the differences between LangChain and LlamaIndex.

**Practical project:**
Implement the same PDF RAG application using both frameworks and compare the abstractions.

---

# PHASE 6: ADVANCED RAG

## 14. Retrieval Strategies

Topics:
- Dense retrieval
- Sparse retrieval
- Keyword-based retrieval
- BM25
- Semantic retrieval
- Hybrid search
- Metadata filtering
- Multi-vector retrieval
- Parent-document retrieval
- Multi-query retrieval
- Query expansion
- Query rewriting
- Query decomposition
- Self-query retrieval
- Contextual retrieval

## 15. Reranking

Topics:
- What is reranking?
- Why is reranking needed?
- Initial retrieval vs reranking
- Cross-encoder models
- Bi-encoder vs cross-encoder
- Relevance scoring
- Top-K candidate retrieval
- Top-N reranked retrieval
- Cohere Rerank
- BGE Reranker
- Hugging Face cross-encoders

**Practical exercise:**
Compare retrieval quality before and after reranking.

## 16. Advanced Chunking and Context Management

Topics:
- Semantic chunking
- Hierarchical chunking
- Parent-child retrieval
- Sentence-window retrieval
- Late chunking
- Contextual chunking
- Contextual embeddings
- Document summaries
- Context compression
- Context selection
- Context ordering
- Lost-in-the-middle problem
- Context window optimization

## 17. Advanced RAG Architectures

Topics:
- Naive RAG
- Advanced RAG
- Modular RAG
- Corrective RAG (CRAG)
- Self-RAG
- Adaptive RAG
- Hybrid RAG
- Multi-hop RAG
- Multi-query RAG
- Iterative retrieval
- Query routing
- Retrieval routing
- Multi-document RAG
- Multi-tenant RAG

**Major project 2: Advanced Enterprise Knowledge Base**

Features:
- Multiple document sources.
- Hybrid search.
- Metadata filtering.
- Query rewriting.
- Reranking.
- Context compression.
- Source citations.
- Multi-turn conversations.

---

# PHASE 7: RAG EVALUATION

## 18. Understanding RAG Evaluation

Topics:
- Why RAG evaluation is important
- Traditional software testing vs RAG evaluation
- Offline evaluation
- Online evaluation
- Golden datasets
- Ground-truth answers
- Human evaluation
- LLM-as-a-judge
- Evaluation datasets
- Evaluation pipelines

## 19. Retrieval Evaluation Metrics

Learn:
- Precision@K
- Recall@K
- Hit Rate@K
- Mean Reciprocal Rank (MRR)
- Mean Average Precision (MAP)
- Normalized Discounted Cumulative Gain (NDCG)
- Context relevance
- Context recall
- Context precision

Understand how to evaluate whether the retriever returns the correct information.

## 20. Generation Evaluation Metrics

Learn:
- Faithfulness
- Answer relevancy
- Answer correctness
- Groundedness
- Context utilization
- Hallucination detection
- Citation accuracy
- Response completeness

## 21. RAG Evaluation Frameworks

Learn:
- RAGAS
- DeepEval
- TruLens
- LangSmith
- Arize Phoenix

Topics:
- Creating evaluation datasets
- Running evaluation experiments
- Comparing embedding models
- Comparing chunking strategies
- Comparing retrievers
- Comparing rerankers
- Evaluating prompts
- Regression testing
- Evaluation reports
- Observability and tracing

**Major project 3: RAG Evaluation Framework**

Build an evaluation pipeline that:
- Accepts a set of questions and reference answers.
- Retrieves documents.
- Generates responses.
- Calculates retrieval metrics.
- Evaluates faithfulness.
- Evaluates answer relevance.
- Identifies hallucinations.
- Generates evaluation reports.

---

# PHASE 8: AGENTS AND AGENTIC AI FUNDAMENTALS

## 22. Introduction to AI Agents

Topics:
- What is an AI agent?
- LLM applications vs AI agents
- Agent architecture
- Agent loop
- Reasoning and acting
- Planning
- Tool usage
- State management
- Memory
- Reflection
- Task decomposition
- Autonomous execution
- Agent limitations
- Deterministic vs autonomous workflows

## 23. Agent Tool Calling

Topics:
- Function calling
- Tool definitions
- Tool selection
- Tool execution
- Tool result interpretation
- Multiple tools
- Parallel tool execution
- Tool error handling
- Tool permissions
- Human approval
- Structured agent outputs

**Practical project:**
Build an agent with tools for:
- Searching documents.
- Performing calculations.
- Calling external APIs.
- Retrieving database information.

## 24. Agent Frameworks

Learn:
- LangGraph
- LangChain Agents
- LlamaIndex Agents

Focus particularly on LangGraph.

Topics:
- Graph-based workflow execution
- Nodes
- Edges
- Conditional edges
- State
- State transitions
- Checkpointing
- Persistence
- Interrupts
- Human-in-the-loop
- Parallel execution
- Subgraphs
- Cycles
- Error recovery

---

# PHASE 9: AGENTIC RAG

## 25. Understanding Agentic RAG

Topics:
- Traditional RAG vs Agentic RAG
- Why Agentic RAG?
- Agent-driven retrieval
- Autonomous query planning
- Dynamic retrieval
- Retrieval decision-making
- Tool-based retrieval
- Multi-step reasoning
- Iterative retrieval
- Self-correction
- Reflection
- Query decomposition
- Retrieval validation
- Answer verification

## 26. Agentic RAG Architectures

Learn these patterns:

1. Router-based RAG
2. Query planning RAG
3. Multi-step RAG
4. Corrective RAG
5. Self-RAG
6. Adaptive RAG
7. Multi-agent RAG
8. Reflection-based RAG

## 27. Implementing Agentic RAG Using LangGraph

Topics:
- Designing an agentic retrieval workflow
- Building retrieval nodes
- Building grading nodes
- Building query rewriting nodes
- Building generation nodes
- Building validation nodes
- Conditional routing
- Retry loops
- State persistence
- Human-in-the-loop
- Agent execution limits
- Agent tracing

**Major project 4: Agentic RAG Application**

Build a system that:
- Receives complex user questions.
- Determines whether retrieval is necessary.
- Chooses an appropriate knowledge source.
- Retrieves relevant documents.
- Evaluates retrieval quality.
- Rewrites queries when retrieval is poor.
- Performs additional retrieval when necessary.
- Generates an answer.
- Verifies the final answer against retrieved evidence.
- Returns citations.

---

# PHASE 10: GRAPH RAG

## 28. Knowledge Graph Fundamentals

Topics:
- What is a knowledge graph?
- Graph databases
- Nodes and edges
- Entities and relationships
- Entity extraction
- Relation extraction
- Entity resolution
- Knowledge graph construction
- Graph traversal
- Graph querying
- Cypher query language
- Graph embeddings
- Community detection
- Graph indexing

Learn:
- Neo4j
- Cypher
- NetworkX

## 29. Graph RAG Fundamentals

Topics:
- What is Graph RAG?
- Traditional RAG vs Graph RAG
- Why Graph RAG?
- Knowledge graph-based retrieval
- Entity-based retrieval
- Relationship-based retrieval
- Local search
- Global search
- Graph traversal retrieval
- Graph and vector hybrid retrieval
- Community summaries
- Graph-based context generation

## 30. Implementing Graph RAG

Topics:
- Document ingestion
- Entity extraction using LLMs
- Relationship extraction
- Knowledge graph creation
- Entity deduplication
- Graph storage
- Community detection
- Graph summarization
- Graph retrieval
- Context construction
- Answer generation
- Graph-based citations

Explore Microsoft's GraphRAG implementation.

**Major project 5: Graph RAG Knowledge Assistant**

Build an application that:
- Ingests multiple documents.
- Extracts entities and relationships.
- Creates a knowledge graph.
- Stores information in Neo4j.
- Supports entity-based retrieval.
- Answers relationship-based questions.
- Supports global questions across documents.
- Combines vector search and graph search.

---

# PHASE 11: PRODUCTION-GRADE RAG

## 31. RAG Backend Development

Topics:
- FastAPI
- REST API design
- File upload APIs
- Document ingestion APIs
- Retrieval APIs
- Streaming responses
- Async processing
- Background tasks
- Authentication
- Authorization
- Multi-user architecture
- Multi-tenant vector databases

## 32. RAG Optimization

Topics:
- Retrieval latency optimization
- Embedding caching
- Semantic caching
- Query caching
- Batch embedding
- Parallel retrieval
- Connection pooling
- Vector indexing optimization
- Token optimization
- Context window optimization
- LLM cost optimization
- Throughput and scalability

## 33. RAG Security

Topics:
- Prompt injection
- Indirect prompt injection
- Data leakage
- Access control
- Document-level permissions
- Tenant isolation
- Sensitive information handling
- PII protection
- Secure tool execution
- Agent permission boundaries
- Input and output validation

## 34. Deployment and Monitoring

Topics:
- Docker
- Environment variables
- Cloud deployment
- Database deployment
- Vector database management
- Logging
- Monitoring
- Distributed tracing
- LLM observability
- Latency monitoring
- Token and cost monitoring
- Error tracking
- Evaluation in production
- CI/CD

---

# PHASE 12: CAPSTONE PROJECTS

Complete these projects to consolidate everything you have learned.

## Project 1: Enterprise Document Intelligence Platform
- Multiple document formats
- Advanced chunking
- Hybrid retrieval
- Reranking
- Metadata filtering
- Citations
- RAG evaluation

## Project 2: Agentic Research Assistant
- Query planning
- Web search tools
- Document retrieval
- Multi-step research
- Agentic workflows
- Evidence verification
- Final report generation

## Project 3: Graph-Based Knowledge Assistant
- Entity extraction
- Relationship extraction
- Neo4j
- Graph retrieval
- Global and local search
- Vector + graph hybrid retrieval

## Project 4: Production-Grade Agentic RAG Platform
- Multiple knowledge sources
- Intelligent query routing
- Hybrid search
- Reranking
- Agentic retrieval
- Graph RAG integration
- Evaluation pipelines
- Human-in-the-loop
- Observability
- Security
- FastAPI
- Docker deployment

---

# FINAL LEARNING OUTCOME

By completing this curriculum, you should be able to:

1. Understand how LLMs work.
2. Integrate commercial and open-source LLMs.
3. Work with embeddings and vector databases.
4. Design end-to-end RAG pipelines.
5. Implement advanced retrieval strategies.
6. Build production-grade RAG applications.
7. Evaluate retrieval and generation quality.
8. Develop AI agents and tool-calling systems.
9. Implement Agentic RAG using LangGraph.
10. Design and implement Graph RAG.
11. Optimize, secure, deploy and monitor RAG applications.

**Recommended learning principle:** Understand the underlying concepts first, implement them using Python, and then learn how frameworks abstract those implementations. Avoid jumping directly into LangChain, LangGraph or GraphRAG without understanding the fundamentals.