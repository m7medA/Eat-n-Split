# Eat 'n Split

Eat 'n Split is a React application that helps you manage shared expenses with friends. You can add friends, track balances, and split bills easily.

## Live Demo

[Eat 'n Split](https://eat-and-split-mo7med.netlify.app).

## Components

**App**: The main component that manages the state of friends, selected friend, and forms. It renders the sidebar with the friend list and the form to add a new friend, as well as the form to split a bill with a selected friend.

**Button**: A reusable button component that takes children and onClick as props. It renders a button with the provided text and click handler.

**FriendList**: A component that takes a list of friends, a function to handle selecting a friend, and the currently selected friend as props. It renders a list of Friend components.

**Friend**: A component that represents a single friend in the list. It takes a friend object, a function to handle selecting a friend, and the currently selected friend as props. It displays the friend's name, image, and balance, and includes a button to select or deselect the friend.

**FormAddFriend**: A form component to add a new friend. It takes a function to handle adding a new friend as a prop. It includes input fields for the friend's name and image URL, and a button to submit the form.

**FormSplitBill**: A form component to split a bill with a selected friend. It takes the selected friend and a function to handle splitting the bill as props. It includes input fields for the bill value, the amount paid by the user, and a dropdown to select who is paying the bill. It also includes a button to submit the form.
