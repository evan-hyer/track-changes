# Product Guide

## Initial Concept

I am building 2 things, and the root level I am building a cli called track-changes that can be both an independent cli command and also a salesforce plugin, when it runs it can report metdata changes that have occured in their salesforce org. Often times developers and admins are used to tooling such as a Copado User Story screen for change tracking visiblity, I want a developer to be able to run a single cli command and see a table of what metadata has changed, the inlcuding the component name, metadatatype, who odified it and when. This would give team members who modified metadata either locally in their git repo or directly in the org the immediate visibility into org changes without naviagate throug ha sperate ui, the could use it directly in the terminal. The primiar user is a salesforece developer or admin working in vs code or terminal who needs to quickly answer what changed in this org? before committing, deploying or troublseshooting. The output should be scannable in therminal, that can be distrubted by an npm registry. After that's developed i want to create a visual studio code plugin that would consume that plugin, it would give a UI for the user to select the metadata they want and and allow a multi select check box on the metadata they would want to download.

## Target Audience

The primary users of this tool are:
-   **Salesforce Developers:** Developers who need to track changes in a Salesforce org and manage metadata in their local development environment.
-   **Salesforce Administrators:** Administrators who need visibility into metadata changes for auditing, troubleshooting, and governance purposes.

## Core Problem

Salesforce professionals lack a simple, fast, and developer-centric way to view a summary of recent metadata changes directly from their terminal. They often have to navigate complex UIs or run cumbersome reports to answer the simple question: "What changed in this org?".

## Vision

To provide Salesforce developers and administrators with a streamlined, CLI-first experience for tracking and managing metadata changes, improving their productivity and reducing the friction of moving between different tools.

## `track-changes` CLI

### Goal
The main goal of the `track-changes` CLI is to provide immediate visibility into metadata changes within a Salesforce org directly from the command line.

### Features
-   **Change Reporting:** Displays a clear, scannable table of changed metadata components, including the component name, metadata type, the last user who modified it, and the modification timestamp.
-   **JSON Output:** Supports machine-readable JSON output for integration with other tools and the VS Code plugin.
-   **Distribution:** The tool will be published to the npm registry, allowing for easy, global installation via `npm install`.
-   **Dual-Functionality:** It will be engineered to work as both a standalone, independent CLI command and as a plugin for the Salesforce CLI (`sf`).

## Visual Studio Code Plugin

### Goal
To provide a rich, interactive UI within VS Code that leverages the `track-changes` CLI to simplify the process of identifying and downloading metadata from a Salesforce org.

### Features
-   **Metadata Selection UI:** A user-friendly interface that displays the metadata changes and allows users to select specific components for download.
-   **Multi-Select:** Users can select multiple metadata items via checkboxes for batch downloading.
-   **CLI Integration:** The plugin will consume and build upon the functionality of the `track-changes` CLI.
-   **Targeted Downloads:** Users can select a target directory for the downloaded metadata. The UI will feature a type-ahead input to help users quickly find and select the desired folder.
-   **Salesforce CLI Integration:** The plugin will use the Salesforce CLI (`sf project retrieve start`) under the hood to handle the metadata retrieval process.