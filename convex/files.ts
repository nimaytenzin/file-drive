import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a new task with the given text
export const createFile = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("you nust be logged in to upload file");
    }
    await ctx.db.insert("files", {
      name: args.name,
    });
    // const newTaskId = await ctx.db.insert("tasks", { name: args.name });
    // return newTaskId;
  },
});

export const getFiles = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("you nust be logged in to view files");
    }
    return await ctx.db.query("files").collect();
  },
});
