-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 12 2019 г., 14:34
-- Версия сервера: 10.3.13-MariaDB
-- Версия PHP: 7.1.22

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
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `cycles_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `credits` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`category_id`, `cycles_id`, `name`, `credits`) VALUES
(1, 1, '1.1 Обов\'язкові навчальні дисципліни', 50),
(2, 1, '1.2 Вибіркові навчальні дисципліни', 15),
(3, 2, '2.1 Обов\'язкові навчальні дисципліни', NULL),
(4, 2, '2.2. Вибіркові навчальні дисципліни', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `cycles`
--

CREATE TABLE `cycles` (
  `cycles_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `cycles`
--

INSERT INTO `cycles` (`cycles_id`, `name`, `credits`) VALUES
(1, '1 ЦИКЛ ДИСЦИПЛІН ЗАГАЛЬНОЇ ПІДГОТОВКИ', 65),
(2, '2 ЦИКЛ ДИСЦИПЛІН ПРОФЕСІЙНОЇ ПІДГОТОВКИ', 160),
(3, '3 Цикл практичної підготовки', 10),
(4, '4 Атестація', 5);

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

--
-- Дамп данных таблицы `departments`
--

INSERT INTO `departments` (`department_id`, `subdivision_id`, `api_id`, `name`) VALUES
(1, 1, 0, 'КН');

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

--
-- Дамп данных таблицы `distribution_of_controls`
--

INSERT INTO `distribution_of_controls` (`distribution_of_controls_id`, `education_item_id`, `exams`, `credit`, `individual_tasks`) VALUES
(1, 1, NULL, '2', NULL),
(2, 2, '1', '2', NULL),
(3, 3, NULL, '2', NULL),
(4, 4, NULL, '2', NULL),
(5, 5, NULL, NULL, '1'),
(6, 6, NULL, '1', NULL),
(7, 7, '8', NULL, ''),
(8, 8, NULL, NULL, '5');

-- --------------------------------------------------------

--
-- Структура таблицы `distribution_of_hours`
--

CREATE TABLE `distribution_of_hours` (
  `distribution_of_hours_id` int(11) NOT NULL,
  `education_item_id` int(11) NOT NULL,
  `module_number` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `form_control` varchar(100) NOT NULL,
  `individual_tasks` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `distribution_of_hours`
--

INSERT INTO `distribution_of_hours` (`distribution_of_hours_id`, `education_item_id`, `module_number`, `value`, `form_control`, `individual_tasks`) VALUES
(1, 1, 1, 2, '', ''),
(2, 1, 2, 2, '', ''),
(3, 1, 3, 2, '', ''),
(4, 1, 4, 2, '', ''),
(5, 2, 2, 4, '', ''),
(6, 2, 3, 2, '', ''),
(7, 4, 5, 2, '', ''),
(8, 4, 6, 2, '', ''),
(9, 4, 7, 2, '', ''),
(10, 5, 2, 2, '', ''),
(11, 5, 3, 4, '', ''),
(12, 6, 1, 2, '', ''),
(13, 6, 2, 2, '', ''),
(14, 6, 3, 2, '', ''),
(15, 6, 4, 2, '', ''),
(16, 6, 5, 2, '', ''),
(17, 6, 6, 2, '', ''),
(18, 6, 7, 2, '', '');

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
  `lectures` int(11) DEFAULT 0,
  `laboratories` int(11) DEFAULT 0,
  `choice` tinyint(1) NOT NULL DEFAULT 0,
  `fixed` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `education_items`
--

INSERT INTO `education_items` (`education_item_id`, `sub_category_id`, `category_id`, `cycles_id`, `education_plans_id`, `subject_id`, `credits`, `lectures`, `laboratories`, `choice`, `fixed`) VALUES
(1, NULL, 1, 1, 1, 1, 5, 0, 0, 0, 1),
(2, NULL, 1, 1, 1, 2, 5, 32, 0, 0, 1),
(3, NULL, 1, 1, 1, 3, 5, 0, 0, 0, 1),
(4, 1, 3, 2, 1, 5, 5, 0, 0, 0, 1),
(5, 1, 3, 2, 1, 6, 5, 0, 0, 0, 1),
(6, NULL, NULL, 3, 1, 7, 10, 0, 0, 0, 1),
(7, NULL, NULL, 4, 1, 8, 5, 0, 0, 0, 1),
(8, NULL, NULL, 4, 1, 9, 0, 0, 0, 0, 1);

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

--
-- Дамп данных таблицы `education_plans`
--

INSERT INTO `education_plans` (`id`, `user_id`, `department_id`, `name`, `status`, `year`, `created_at`) VALUES
(1, 1, 1, 'Новий план', 'created', 2019, '2019-06-12 11:26:50');

-- --------------------------------------------------------

--
-- Структура таблицы `plan_controls`
--

CREATE TABLE `plan_controls` (
  `control_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `module_number` int(11) DEFAULT NULL,
  `hours_week` int(11) NOT NULL DEFAULT 0,
  `exams` int(11) NOT NULL DEFAULT 0,
  `credit` int(11) NOT NULL DEFAULT 0,
  `course_work` int(11) NOT NULL DEFAULT 0
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

--
-- Дамп данных таблицы `subdivisions`
--

INSERT INTO `subdivisions` (`subdivision_id`, `api_id`, `name`) VALUES
(1, 0, 'ЕлІТ');

-- --------------------------------------------------------

--
-- Структура таблицы `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `subjects`
--

INSERT INTO `subjects` (`subject_id`, `name`) VALUES
(1, 'Іноземна мова'),
(2, 'Українознавство з комунікативним курсом української мови'),
(3, 'Філософія'),
(4, 'Фізичне виховання'),
(5, 'Вибіркові дисципліни гуманітарного спрямування (додаток 1)'),
(6, 'Вибіркові дисципліни інших спеціальностей  (додаток 2)'),
(7, 'Практика'),
(8, 'Кваліфікаційна робота бакалавра'),
(9, 'Атестаційний кваліфікаційний іспит'),
(10, 'Вибіркові дисципліни за спеціальністю');

-- --------------------------------------------------------

--
-- Структура таблицы `sub_categories`
--

CREATE TABLE `sub_categories` (
  `sub_category_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `credits` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sub_categories`
--

INSERT INTO `sub_categories` (`sub_category_id`, `category_id`, `name`, `credits`) VALUES
(1, 3, '2.1.1 Обов’язкові навчальні дисципліни за спеціальністю', 55),
(2, 3, '2.1.2 Обов\'язкові навчальні дисципліни за освітньою програмою', 60),
(3, 4, '2.2.1 Вибіркові навчальні дисципліни за спецальністю', 10),
(4, 4, '2.2.2 Вибіркові навчальні дисципліни за освітньою програмою', 35);

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
  `role` varchar(50) NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `name`, `surname`, `role`, `department_id`) VALUES
(1, 'test@gmail.com', '$2b$08$xEqTaGcNgZDyBhDS9YK95OAfmT5.KQokVUTODFzTOG6Hu82uA.Lnm', 'Name', 'Surname', 'admin', 1),
(2, 'test2@gmail.com', '$2b$08$r4SQOOOiZvfnhMKuddFGDOfjaLQI.zBq/a/96uPjzs94JF.009NC.', 'Name2', 'Surname2', 'repres_omu', 1),
(3, 'test3@gmail.com', '$2b$08$Heg.JEIrC5b1sGFbDa9OW.yew5/3udQuPZrCX3G5e6m0Jlp3EEIiy', 'Name3', 'Surname3', 'repres_depart', 1);

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
-- Индексы таблицы `plan_controls`
--
ALTER TABLE `plan_controls`
  ADD PRIMARY KEY (`control_id`),
  ADD KEY `fk_education_plans1_idx` (`id`) USING BTREE;

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
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_users_departments1_idx` (`department_id`) USING BTREE;

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
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `cycles`
--
ALTER TABLE `cycles`
  MODIFY `cycles_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `distribution_of_controls`
--
ALTER TABLE `distribution_of_controls`
  MODIFY `distribution_of_controls_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `distribution_of_hours`
--
ALTER TABLE `distribution_of_hours`
  MODIFY `distribution_of_hours_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `education_items`
--
ALTER TABLE `education_items`
  MODIFY `education_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `education_plans`
--
ALTER TABLE `education_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `plan_controls`
--
ALTER TABLE `plan_controls`
  MODIFY `control_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `subdivisions`
--
ALTER TABLE `subdivisions`
  MODIFY `subdivision_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `sub_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `token`
--
ALTER TABLE `token`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- Ограничения внешнего ключа таблицы `plan_controls`
--
ALTER TABLE `plan_controls`
  ADD CONSTRAINT `fk_education_plans1` FOREIGN KEY (`id`) REFERENCES `education_plans` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `fk_sub_category_category1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_departments1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
