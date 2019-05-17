-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 15 2019 г., 13:10
-- Версия сервера: 5.7.16
-- Версия PHP: 7.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ep`
--

-- --------------------------------------------------------

--
-- Структура таблицы `audit`
--

CREATE TABLE `audit` (
  `audit_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `operation_type` varchar(100) NOT NULL,
  `data` text NOT NULL,
  `timestamp` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `cycles_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `credits` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `cycles`
--

CREATE TABLE `cycles` (
  `cycles_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `subdivision_id` int(11) NOT NULL,
  `api_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `distribution_of_controls`
--

CREATE TABLE `distribution_of_controls` (
  `distribution_of_controls_id` int(11) NOT NULL,
  `education_item_id` int(11) NOT NULL,
  `exams` varchar(50) DEFAULT NULL,
  `credit` varchar(50) DEFAULT NULL,
  `individual_tasks` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `distribution_of_hours`
--

CREATE TABLE `distribution_of_hours` (
  `distribution_of_hours_id` int(11) NOT NULL,
  `education_item_id` int(11) NOT NULL,
  `module_number` int(11) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `education_items`
--

CREATE TABLE `education_items` (
  `education_item_id` int(11) NOT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `cycles_id` int(11) DEFAULT NULL,
  `education_plans_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `credits` int(11) NOT NULL,
  `lectures` int(11) DEFAULT '0',
  `practice` int(11) DEFAULT '0',
  `laboratories` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `education_plans`
--

CREATE TABLE `education_plans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'created',
  `year` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `subdivisions`
--

CREATE TABLE `subdivisions` (
  `subdivision_id` int(11) NOT NULL,
  `api_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `sub_categories`
--

CREATE TABLE `sub_categories` (
  `sub_category_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `credits` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `token`
--

CREATE TABLE `token` (
  `id` int(10) NOT NULL,
  `tokenId` varchar(255) NOT NULL,
  `userId` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `audit`
--
ALTER TABLE `audit`
  ADD PRIMARY KEY (`audit_id`),
  ADD KEY `fk_audit_users1_idx` (`user_id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `fk_category_cycles_idx` (`cycles_id`) USING BTREE;

--
-- Индексы таблицы `cycles`
--
ALTER TABLE `cycles`
  ADD PRIMARY KEY (`cycles_id`);

--
-- Индексы таблицы `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD KEY `fk_departments_subdivisions1_idx` (`subdivision_id`);

--
-- Индексы таблицы `distribution_of_controls`
--
ALTER TABLE `distribution_of_controls`
  ADD PRIMARY KEY (`distribution_of_controls_id`),
  ADD KEY `fk_distribution_of_controls_education_items1_idx` (`education_item_id`);

--
-- Индексы таблицы `distribution_of_hours`
--
ALTER TABLE `distribution_of_hours`
  ADD PRIMARY KEY (`distribution_of_hours_id`),
  ADD UNIQUE KEY `field_uniquire` (`module_number`,`education_item_id`),
  ADD KEY `fk_distribution_of_hours_education_items2_idx` (`education_item_id`);

--
-- Индексы таблицы `education_items`
--
ALTER TABLE `education_items`
  ADD PRIMARY KEY (`education_item_id`),
  ADD KEY `fk_education_items_sub_categories1_idx` (`sub_category_id`),
  ADD KEY `fk_education_items_education_plans1_idx` (`education_plans_id`),
  ADD KEY `fk_education_items_subjects1_idx` (`subject_id`),
  ADD KEY `fk_education_items_categories1_idx` (`category_id`) USING BTREE,
  ADD KEY `fk_education_items_cycles1_idx` (`cycles_id`) USING BTREE;

--
-- Индексы таблицы `education_plans`
--
ALTER TABLE `education_plans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_education_plans_departments1_idx` (`department_id`),
  ADD KEY `fk_education_plans_users1_idx` (`user_id`);

--
-- Индексы таблицы `subdivisions`
--
ALTER TABLE `subdivisions`
  ADD PRIMARY KEY (`subdivision_id`);

--
-- Индексы таблицы `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`);

--
-- Индексы таблицы `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`sub_category_id`),
  ADD KEY `fk_sub_category_category1_idx` (`category_id`) USING BTREE;

--
-- Индексы таблицы `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `audit`
--
ALTER TABLE `audit`
  MODIFY `audit_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `cycles`
--
ALTER TABLE `cycles`
  MODIFY `cycles_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `distribution_of_controls`
--
ALTER TABLE `distribution_of_controls`
  MODIFY `distribution_of_controls_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `distribution_of_hours`
--
ALTER TABLE `distribution_of_hours`
  MODIFY `distribution_of_hours_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `education_items`
--
ALTER TABLE `education_items`
  MODIFY `education_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT для таблицы `education_plans`
--
ALTER TABLE `education_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `subdivisions`
--
ALTER TABLE `subdivisions`
  MODIFY `subdivision_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `sub_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `token`
--
ALTER TABLE `token`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `audit`
--
ALTER TABLE `audit`
  ADD CONSTRAINT `fk_audit_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `fk_category_cycles` FOREIGN KEY (`cycles_id`) REFERENCES `cycles` (`cycles_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `fk_departments_subdivisions1` FOREIGN KEY (`subdivision_id`) REFERENCES `subdivisions` (`subdivision_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `distribution_of_controls`
--
ALTER TABLE `distribution_of_controls`
  ADD CONSTRAINT `fk_distribution_of_controls_education_items1` FOREIGN KEY (`education_item_id`) REFERENCES `education_items` (`education_item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `distribution_of_hours`
--
ALTER TABLE `distribution_of_hours`
  ADD CONSTRAINT `fk_distribution_of_hours_education_items2` FOREIGN KEY (`education_item_id`) REFERENCES `education_items` (`education_item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `education_items`
--
ALTER TABLE `education_items`
  ADD CONSTRAINT `fk_education_items_categories1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_education_items_cycles1` FOREIGN KEY (`cycles_id`) REFERENCES `cycles` (`cycles_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_education_items_education_plans1` FOREIGN KEY (`education_plans_id`) REFERENCES `education_plans` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_education_items_sub_categories1` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`sub_category_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_education_items_subjects1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `education_plans`
--
ALTER TABLE `education_plans`
  ADD CONSTRAINT `fk_education_plans_departments1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_education_plans_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `fk_sub_category_category1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
