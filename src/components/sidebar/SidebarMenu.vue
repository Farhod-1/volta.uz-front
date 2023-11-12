<template>
  <div class="sidebar-menu">
    <router-link to="/devices">
      <DevicesIcon class="mr-5" />
      Mening qurilmalarim
    </router-link>

    <router-link to="/panels">
      <PanelIcon class="mr-5" />
      Quyosh panellarim
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import DevicesIcon from "@/components/icons/DevicesIcon.vue";
import PanelIcon from "@/components/icons/PanelIcon.vue";
</script>
