# Technology Stack

## Overview

The `track-changes` project will leverage a modern JavaScript/TypeScript ecosystem, building upon established frameworks and APIs to ensure robustness, maintainability, and seamless integration with the Salesforce development workflow.

## Primary Programming Language

The primary programming language for both the `track-changes` CLI and the Visual Studio Code plugin will be **TypeScript/JavaScript**.
-   **TypeScript:** Chosen for its strong type-checking capabilities, which enhance code quality, reduce bugs, and improve developer experience, especially in larger projects. It compiles down to JavaScript, ensuring broad compatibility.
-   **JavaScript:** The runtime environment for Node.js (for the CLI) and the foundation for web technologies used within VS Code extensions.

## `track-changes` CLI

### Framework/Libraries
The `track-changes` CLI will be built using **oclif**.
-   **oclif:** A powerful, open-source framework for building command-line interfaces. It is particularly well-suited for this project due to its robust features for argument parsing, command structuring, and plugin architecture, aligning perfectly with the requirement for a Salesforce CLI plugin. Leveraging oclif, which is the foundation of the Salesforce CLI itself, will ensure tight integration and a familiar development experience for Salesforce professionals.

## Visual Studio Code Plugin

### Core Technologies
The Visual Studio Code plugin will be developed utilizing the **VS Code Extension API**.
-   **VS Code Extension API:** This is the official and comprehensive API provided by Visual Studio Code for building extensions. It grants access to a wide array of functionalities, including UI components (views, webviews, commands, context menus), workspace management, file system access, and integration with the editor. This API will be crucial for creating a rich, interactive user interface for metadata selection and download.
