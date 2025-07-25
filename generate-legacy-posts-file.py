# this file should not need to be run again, this file is kept jsut in case
# The following code was generated by Gemini 2.0 Flash

import os
import re

def create_posts_ts(folder_path, output_file="posts.ts"):
    """
    Generates a posts.ts file containing an array of subdirectory names
    from the specified folder.

    Args:
        folder_path (str): The path to the parent folder.
        output_file (str): The name of the output TypeScript file (default: "posts.ts").
    """
    try:
        subfolder_names = sorted([
            d for d in os.listdir(folder_path)
            if os.path.isdir(os.path.join(folder_path, d))
        ])

        # Sanitize names to remove characters that are not suitable for javascript.
        subfolder_names = [re.sub(r"[^a-zA-Z0-9-]+", "", name) for name in subfolder_names]

        output_path = os.path.join(folder_path, output_file)

        with open(output_path, "w") as f:
            f.write("export default [\n")
            for i, name in enumerate(subfolder_names):
                f.write(f'  "{name}"')
                if i < len(subfolder_names) - 1:
                    f.write(",")
                f.write("\n")
            f.write("];\n")

        print(f"Successfully created {output_file} in {folder_path}")

    except OSError as e:
        print(f"Error: Could not create or write to file: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


if __name__ == "__main__":
    folder_path = input("Enter the path to the parent folder: ")
    create_posts_ts(folder_path)