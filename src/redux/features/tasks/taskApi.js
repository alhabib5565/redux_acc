import baseApi from "../api/baseApi";

const taskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTask: builder.query({
            query: () => '/tasks',
            providesTags: ["Tasks"]
        }),
        addTask: builder.mutation({
            query: (body) => ({
                url: '/tasks',
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Tasks"]
        }),
        updateStatus: builder.mutation({
            query: ({ _id, data }) => (console.log(_id, data), {
                url: `/tasks/${_id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ["Tasks"]
        }),
        deleteTask: builder.mutation({
            query: (id) => (console.log(id), {
                url: `/tasks/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Tasks"]
        })
    })
})
export const { useAddTaskMutation, useGetTaskQuery, useUpdateStatusMutation, useDeleteTaskMutation } = taskApi
