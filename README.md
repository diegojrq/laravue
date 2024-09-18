
# diegojrq's LaraVueD

diegojrq's LaraVueD: A Modern Web Application Blending Laravel & Vue.js

diegojrq's LaraVueD stands as a testament to modern web development practices, combining the robust backend capabilities of Laravel with the dynamic and responsive frontend provided by Vue.js. This project serves not only as a showcase of my technical skills but also as a versatile foundation for future web applications. It's a living project, constantly evolving to incorporate the latest advancements in web technology.

Feel free to explore the features and technologies used in this project. If you have any questions or feedback, please don't hesitate to reach out.

## Live Demo

[Live Demo](https://laravued.diegoqueiroz.dev/)

### __frontend stack

The frontend of diegojrq's LaraVueD is powered by Vue 3, the progressive JavaScript framework known for its reactivity, component-based architecture, and ease of integration. This choice ensures a seamless user experience, with a dynamic interface that's both fast and responsive. Key technologies and tools used in the frontend include:

- **Vite** offers a faster and leaner development experience, significantly improving the speed of development cycles;
- **Vuetify** for UI components that are both beautiful and functional, ensuring the application is aesthetically pleasing and user-friendly. I'm not a great frontend developer as you can see, so, thanks Vuetify =)
- **Vuelidate** for form validations;
- **Axios** as my promise-based HTTP client that facilitates easy communication with the backend, enabling the application to interact seamlessly with web services;
- **Pinia** for state management, offering a centralized store for all the components in an app;
- **Vue Router** for routing and navigation;
- **Vue Moment** for formatting and manipulation of datetime values across the application.

### __backend stack

On the backend, diegojrq's LaraVueD utilizes Laravel, a PHP framework known for its elegant syntax, robust features, and scalability. Laravel's comprehensive ecosystem and powerful tools streamline the development process, from routing and authentication to caching and session management. This project leverages Laravel to create a secure, efficient, and maintainable backend, capable of supporting complex web applications through an API.

- **Laravel Passport** for authentication management using OAuth2;
- **RESTful API** architecture embracing the principles of REST (Representational State Transfer), the backend is designed to ensure stateless communication and standard methods, enhancing scalability and simplicity;
- **PostgreSQL** database (for the sample). You can choose your own =)
- **Form Request** for nice validations, organizing validation logic more cleanly and simplifiying controllers by offloading validation rules and messages out of them;
- **Services** for business logic to keep the codebase clean and maintainable.

### _features

- **__login:** Secure and user-friendly login process, ensuring that access to user accounts is both seamless and protected.
- **__register:** An intuitive registration flow, making it easy for new users to join. Lacks some features as password recovery and e-mail confirmation.
- **__logout:** Users can safely log out, ensuring their account security is upheld. You can touch the navigation menu icon to open the drawer and click on the logout button.
- **__home:** The home page serves as the central hub of our application, offering users an informative starting point for their navigation.
- **__users:** A dedicated section for user management, allowing for the viewing and editing of user profiles.