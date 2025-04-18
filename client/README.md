Real-Time Chat App

This is a simple real-time chat app built with React and Styled Components. The app allows users to send and receive messages, with a smooth scrolling feature that always ensures the view scrolls to the latest message.
Key Features:

    User Interface:

        Displays a basic chat layout with a header that shows the user's profile and a chat window for the messages.

        The chat area updates with new messages, and the input area remains fixed at the bottom.

    Dynamic Message Display:

        Messages are dynamically rendered based on a dummyMessages array, which is stored in the messages state.

        The messages are displayed in "chat bubbles" with distinct colors based on whether the message sender is the current user or someone else.

    Auto-scrolling:

        The app ensures the chat window automatically scrolls to the latest message whenever new messages are added. This is achieved by using a scrollRef that is attached to the last message container.

    Message Input:

        A message input bar allows users to type new messages. The input is styled to match the chat's visual theme.

Technologies Used:

    React: For building the UI and managing the app's state.

    Styled Components: For styling the components with a modern approach to CSS-in-JS.

    TypeScript: Provides static type checking for better developer experience and easier debugging.

How It Works:

    Messages Rendering:

        The messages state holds an array of ChatMessage objects. Each message contains information like the message text, the sender’s ID, and a unique ID for each message.

        The messages are mapped over and rendered inside ChatBubble components.

    Auto-scrolling:

        The useEffect hook listens for changes in the messages state and triggers the scrollIntoView function to scroll to the last message.

        The scroll effect is tied to the last message in the chat. When new messages are added, the app will smoothly scroll to the latest message.

    Styled Components:

        The UI is built using Styled Components to create reusable and maintainable components.

        Custom styles are applied to the chat area, user profile, and message input area, giving the app a cohesive visual theme.

Getting Started:

    Clone the repository.

    Run npm install to install the necessary dependencies.

    Run npm start to launch the app in development mode.

    The app will be available at http://localhost:3000.

Future Improvements:

    Add real-time functionality using WebSockets for live messaging.

    Implement message persistence (e.g., with a backend database).

    Add features like emoji support, message reactions, and notifications.
