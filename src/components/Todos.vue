<template>
  <v-app>
    <div v-if="this.todos">
      <v-list flat class="pt-0">
        <v-text-field
          v-model="newTaskTitle"
          @click:append="addTask"
          @keyup.enter="addTask"
          class="pa-3"
          outlined
          label="Add task"
          append-icon="mdi-plus"
          :placeholder="'e.g. ' + randomPlaceholder"
          @focus="chooseRandomPlaceholder"
          hide-details
          clearable
        ></v-text-field>

        <div v-for="task in this.todos" :key="task.id">
          <v-list-item
            @click="doneTask(task.id)"
            :class="{ 'grey lighten-3': task.done }"
          >
            <template v-slot:default>
              <v-list-item-action class="mr-4" :class="{ hidden: task.done }">
                <v-btn @click.stop="editTask(task.id), (dialog = true)" icon>
                  <v-icon color="secondary">mdi-pencil-outline</v-icon>
                </v-btn>
              </v-list-item-action>

              <v-list-item-action
                class="hidden mr-7"
                :class="{ visible: task.done }"
              >
                <v-checkbox
                  class="hidden"
                  :input-value="task.done"
                  color="secondary"
                  :class="{ visible: task.done }"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title
                  :class="{ 'text-decoration-line-through ': task.done }"
                  >{{ task.title }}</v-list-item-title
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-btn @click.stop="deleteTask(task.id)" icon>
                  <v-icon color="secondary lighten-1"
                    >mdi-trash-can-outline</v-icon
                  >
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </div>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="text-h6">
              This task is good, but you can always make it better!
            </v-card-title>

            <v-text-field
              v-model="editedTask"
              class="pa-6"
              label="Edit some task!"
              :rules="editTaskRules"
            ></v-text-field>

            <v-card-actions class="px-5">
              <v-btn color="secondary" text @click="dialog = false">
                No, go back
              </v-btn>

              <v-btn color="secondary" text @click="confirmEdit">
                Done editing
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Todos",

  data() {
    return {
      newTaskTitle: "",
      randomPlaceholder: "",
      placeholders: [
        "buy a helicopter",
        "learn to swear",
        "become a hero",
        "drink 10 glasses of water each day",
        "be kind to all",
        "stay humble whatever",
      ],
      dialog: false,
      editedTask: "",
      editedTaskId: null,
      editTaskRules: [(v) => (v && v.length > 0) || "Cannot be empty"],
    };
  },

  computed: {
    ...mapGetters(["todos"]),
  },

  methods: {
    ...mapActions(["getTodos", "addTodo", "updateTodo", "deleteTodo"]),

    chooseRandomPlaceholder() {
      const placeholdersArrSize = this.placeholders.length;
      const randomNumber = Math.floor(
        Math.random() * (placeholdersArrSize - 0) + 0
      );
      this.randomPlaceholder = this.placeholders[randomNumber];
    },

    doneTask(id) {
      const task = this.todos.filter((task) => task.id === id)[0];
      task.done = !task.done;
      this.updateTodo(task);
    },

    addTask() {
      const newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        done: false,
      };
      if (this.newTaskTitle.length === 0) {
        return;
      } else {
        this.addTodo(newTask);
        this.newTaskTitle = "";
        this.chooseRandomPlaceholder();
      }
    },

    deleteTask(id) {
      const taskToBeDeleted = this.todos.filter((task) => task.id === id)[0];
      this.deleteTodo(taskToBeDeleted);
    },

    editTask(id) {
      this.editedTaskId = id;
      const editedTask = this.todos.filter((task) => task.id === id)[0];
      this.editedTask = editedTask.title;
    },

    confirmEdit() {
      if (this.editedTask.length === 0) {
        return;
      } else {
        const confirmedEdit = this.todos.filter(
          (task) => task.id === this.editedTaskId
        )[0];
        confirmedEdit.title = this.editedTask;
        this.dialog = false;
        this.updateTodo(confirmedEdit);
      }
    },
  },

  mounted() {
    this.getTodos();
  },
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
.visible {
  display: initial;
}
</style>
