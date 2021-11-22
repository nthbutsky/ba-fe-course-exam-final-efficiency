<template>
  <v-app>
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
      <div v-for="task in tasks" :key="task.id">
        <v-list-item
          @click="doneTask(task.id)"
          :class="{ 'blue lighten-5': task.done }"
        >
          <template v-slot:default>
            <v-list-item-action class="mr-4" :class="{ hidden: task.done }">
              <v-btn @click.stop="editTask(task.id), (dialog = true)" icon>
                <v-icon color="primary lighten-1">mdi-pencil-outline</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-list-item-action
              class="hidden mr-7"
              :class="{ visible: task.done }"
            >
              <v-checkbox
                class="hidden"
                :input-value="task.done"
                color="primary"
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
                <v-icon color="primary lighten-1">mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
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
              label="Don't leave it empty, add some task!"
            ></v-text-field>

            <v-card-actions class="px-5">
              <v-btn color="green darken-1" text @click="dialog = false">
                No, go back
              </v-btn>

              <v-btn color="green darken-1" text @click="confirmEdit">
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
export default {
  name: "Todos",

  data() {
    return {
      newTaskTitle: "",
      tasks: [],
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
    };
  },

  methods: {
    chooseRandomPlaceholder() {
      const placeholdersArrSize = this.placeholders.length;
      const randomNumber = Math.floor(
        Math.random() * (placeholdersArrSize - 0) + 0
      );
      this.randomPlaceholder = this.placeholders[randomNumber];
    },

    doneTask(id) {
      const task = this.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
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
        this.tasks.push(newTask);
        this.newTaskTitle = "";
        this.chooseRandomPlaceholder();
      }
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },

    editTask(id) {
      this.editedTaskId = id;
      const editedTask = this.tasks.filter((task) => task.id === id)[0];
      this.editedTask = editedTask.title;
    },

    confirmEdit() {
      const confirmedEdit = this.tasks.filter(
        (task) => task.id === this.editedTaskId
      )[0];
      confirmedEdit.title = this.editedTask;
      this.dialog = false;
    },
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
