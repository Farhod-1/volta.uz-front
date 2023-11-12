<template>
  <div>
    <div class="main-wrapper">
      <div class="sidebar">
        <div class="sidebar-nav">
          <img
            class="rounded rounded-full"
            src="../../assets/img/logo.png"
            width="48"
            height="48"
            alt="logo"
          />
          <span class="flex-grow px-2 text-2xl">My Volta</span>
        </div>

        <SidebarMenu class="flex-1 w-full" />
      </div>
      <div class="main">
        <Navbar />
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SidebarMenu from "@/components/sidebar/SidebarMenu.vue";
import Navbar from "@/components/Navbar.vue";
</script>
