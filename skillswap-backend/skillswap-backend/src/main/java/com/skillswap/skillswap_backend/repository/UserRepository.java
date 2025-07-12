package com.skillswap.skillswap_backend.repository;


import com.skillswap.skillswap_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}

